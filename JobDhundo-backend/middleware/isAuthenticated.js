import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    next(); // Call next() to proceed to the next middleware or route handler
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
    });
  }
};
export default isAuthenticated;
