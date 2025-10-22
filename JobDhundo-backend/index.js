import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.CLIENT_BASE_URL,
  'http://localhost:5173', // Explicit frontend URL for development
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps, curl, etc.)
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.log(`Origin ${origin} not allowed by CORS`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

//api's
app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicationRoute);

let isConnected = false;

async function connectDB() {
  console.log('⏳ Attempting to connect to MongoDB...');
  try {
    // Add a retry mechanism for MongoDB connection
    let retries = 5;
    while (retries) {
      try {
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        isConnected = true;
        console.log('✅ MongoDB connected successfully');
        // Add event listeners for connection status
        mongoose.connection.on('error', (err) => {
          console.error('❌ MongoDB connection error:', err);
          isConnected = false;
        });
        mongoose.connection.on('disconnected', () => {
          console.log('❌ MongoDB disconnected');
          isConnected = false;
        });
        mongoose.connection.on('reconnected', () => {
          console.log('✅ MongoDB reconnected');
          isConnected = true;
        });
        break; // Connection successful, break the retry loop
      } catch (err) {
        retries -= 1;
        if (retries === 0) throw err; // Rethrow if all retries failed
        console.log(
          `❌ MongoDB connection failed, retrying (${retries} attempts left)...`
        );
        // Wait for 2 seconds before retrying
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error; // Propagate the error to be caught by the caller
  }
}

// Remove the middleware approach and use proper startup sequence
// Start server with MongoDB connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MongoDB connected and server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB, starting server anyway:', err);
    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT} but MongoDB connection failed`
      );
    });
  });

export default app;
