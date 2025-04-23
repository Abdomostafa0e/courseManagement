const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const courseRouter = require("./routes/Course");
const errorHandlingMW = require("./middlewares/errorHandlingMW");
const AppError = require("./utils/AppError");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

// Load env vars
dotenv.config();

const app = express();

app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, Please try again in an hour..!!",
});
app.use("/api", limiter);

// Body parser
app.use(express.json({ limit: "10Kb" }));

// Data Sanitization against NoSQL Query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Mount routers
app.use("/api/courses", courseRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(errorHandlingMW);

module.exports = app;
