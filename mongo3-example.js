"use strict";
const { MongoClient } = require("mongodb");
const MONGOD_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGOD_URI, (err, client) => {
  const db = client.db('tweeter');
  if (err) {
    console.error(`Failed to connect: ${MONGOD_URI}`);
    throw err;
  }

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGOD_URI}`);

  // ==> Let's "get all the tweets". In Mongo-speak, we "find" them & insert to array
  function getTweets(callback) {
    db.collection("tweets").find().toArray((err, tweets) => {
      if (err) {
        return callback(err);
      }
      callback(null, tweets);
    });
  }

  getTweets((err, tweets) => {
    if (err) {
      console.error(`Problem fetching tweets: ${err}`);
    }

    console.log("Logging each tweet:");

    tweets.map((tweet) => {
      console.log(tweet);
    })

    // ==> At the end, we close the connection:
    client.close();
  });
});