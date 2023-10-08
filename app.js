import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/database.js';
import errorMiddleware from './src/middlewares/errors.js';
import ErrorHandler from './src/utils/errorHandler.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// setting up config.env file variables
dotenv.config({ path: './config/config.env' })

// Handling Uncaught Exception
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down due to uncaught exception.')
  process.exit(1);
});

// connect to database
connectDatabase()

// set up body parser
app.use(express.json())

// Set cookie parser
app.use(cookieParser());

// import all routes
import authRoute from "./src/routes/authRoute.js";
import userRoute from "./src/routes/userRoute.js";
import companyRoute from "./src/routes/companyRoute.js";
import employeeRoute from "./src/routes/employeeRoute.js";
import duplicateZeroRoute from "./src/routes/duplicateZeroRoute.js";
import countryRoute from "./src/routes/countryRoute.js";

// console.log(routerJob)
app.use('/api', authRoute)
app.use('/api', userRoute)
app.use('/api', companyRoute)
app.use('/api', employeeRoute)
app.use('/api', duplicateZeroRoute)
app.use('/api', countryRoute)


// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

// Middleware to handle errors
app.use(errorMiddleware);

const server = app.listen(PORT, ()=> {
  console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handling Unhandled Promise Rejection
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to Unhandled promise rejection.')
  server.close( () => {
      process.exit(1);
  }) 
});