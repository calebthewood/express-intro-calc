/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError } = require("./expressError");
const { findMean } = require("./stats");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

/** Homepage renders simple message. */

app.get("/", function (req, res) {
  return res.send("<h1>ROUTES</h1><ul><li>/mean</li><li>/median</li><li>mode</li>");
});

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", (req, res) => {

  const numsString = req.query.nums;
  const nums = numsString.split(",");
  const mean = findMean(nums);

  return res.send(`
    <h1>MEAN PAGE >:(</h1>
    <h2>Your query string's mean is ${mean}</h2>`);
});





/** Finds median of nums in qs: returns {operation: "median", result } */


/** Finds mode of nums in qs: returns {operation: "mean", result } */


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;