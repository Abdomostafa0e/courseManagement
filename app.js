const express = require("express");
require("dotenv").config({ path: "config.env" });
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const courseRouter = require("./routes/Course");
const errorHandlingMW = require("./middlewares/errorHandlingMW");
const AppError = require("./utils/AppError");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, Please try again in an hour..!!",
});
app.use("/api", limiter);

app.use(express.json({ limit: "10Kb" }));

// Data Sanitization against NoSQL Query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

app.use("/api/courses", courseRouter);


app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandlingMW);

module.exports = app;
