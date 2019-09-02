require("dotenv").config();

const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(process.env.DB, (err, db) => {
  require("./routes")(app, db);
  app.listen(process.env.PORT || 5000, () => {
    console.log("server started at port " + 5000);
  });
});
