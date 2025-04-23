const express = require("express");
require("dotenv").config({ path: "config.env" });
const morgan = require("morgan");
const dbConnection = require("./config/dbConn");

const app = express();

dbConnection();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Hello, i am a server");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
