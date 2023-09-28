import express from 'express';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;

// setting up config.env file variables
dotenv.config({path: './config/config.env'})

// import all routes
import routerJob from "./src/routes/jobs.js";

// console.log(routerJob)
app.use('/api/v1', routerJob)

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${process.env.NODE_ENV} mode`);
});