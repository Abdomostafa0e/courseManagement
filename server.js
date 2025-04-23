const app = require("./app");
const dbConn = require("./config/dbConn");

dbConn();

const port = process.env.PORT || 8000;

// Only start the server if we're not in a Vercel environment
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
}

// Export the Express app for Vercel
module.exports = app;

process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  process.exit(1);
});
