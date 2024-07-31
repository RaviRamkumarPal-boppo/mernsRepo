// app.js
import express from 'express';
import mongoose from 'mongoose';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import routes
import usersRouter from './routes/users.js';
import registerRouter from './routes/register.js';
import loginRouter from './routes/login.js';
import authenticateRouter from './routes/authenticate.js';

const app = express();
const port = 3000;

// Get __filename and __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Base URL for API routes
const apiBaseUrl = '/pal/api';




// Route handling with base URL
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", loginRouter);
app.use(`${apiBaseUrl}`, authenticateRouter);
app.use(`/users`, usersRouter);




app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/EcomDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



export default app;
