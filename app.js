const express = require("express");
require("dotenv").config({ path: "config.env" });
const morgan = require("morgan");
const dbConnection = require("./config/dbConn");
const courseRouter = require("./routes/Course");

const app = express();

dbConnection();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/courses", courseRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
