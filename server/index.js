"use strict";

// Basic express setup:

const PORT = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const app = express();

app.use(sassMiddleware({
  /* Options */
  src: path.join(__dirname, '/styles.scss'),
  dest: path.join(__dirname, '../public/styles.css'),
  debug: true,
  outputStyle: 'compressed',
  prefix: 'styles'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
console.log(__dirname);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Successful connection to ${MONGODB_URI}`);

  // The `data-helpers` module provides an interface to the database of tweets.
  const DataHelpers = require("./lib/data-helpers.js")(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});