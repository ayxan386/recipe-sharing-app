require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

MongoClient.connect(process.env.DB, (err, db) => {
  require("./routes")(app, db);
  app.listen(process.env.PORT || 5000, () => {
    console.log("server started at port " + 5000);
  });
});
