# JobDhundo Frontend

This is the frontend for the JobDhundo application, built with React and Vite.

## Environment Variables

The application uses environment variables for configuration. Copy `.env.example` to `.env` and update the values as needed:

```
VITE_BASE_URL=http://localhost:8000
VITE_USER_API_END_POINT=${VITE_BASE_URL}/api/v1/user
VITE_JOB_API_END_POINT=${VITE_BASE_URL}/api/v1/job
VITE_APPLICATION_API_END_POINT=${VITE_BASE_URL}/api/v1/application
VITE_COMPANY_API_END_POINT=${VITE_BASE_URL}/api/v1/company
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
