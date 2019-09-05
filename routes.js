const cors = require("cors");
let ObjectId = require("mongodb").ObjectID;
module.exports = (app, db) => {
  var corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app
    .route("/recipes")
    .post(
      cors(corsOptions),
      (req, res, next) => {
        if (req.body) {
          if (
            req.body.rname &&
            req.body.nickname &&
            req.body.desc &&
            req.body.recipe
          )
            next();
          else {
            console.log(req.body);
          }
        }
      },
      (req, res) => {
        //  console.log(req.body);
        const doc = {
          rname: req.body.rname,
          nickname: req.body.nickname,
          desc: req.body.desc,
          recipe: req.body.recipe
        };
        db.collection("recepies").insertOne(doc, err => {
          if (err) console.log(err);
          res.send(doc);
        });
      }
    )
    .get(cors(corsOptions), (req, res) => {
      db.collection("recepies").find({}, (err, cursor) => {
        cursor.toArray((err, docs) => {
          res.json(docs);
        });
      });
    });
  app.route("/recipe").get(cors(corsOptions), (req, res) => {
    //console.log(req.query.id);
    db.collection("recepies").findOne(
      { _id: ObjectId(req.query.id) },
      (err, doc) => {
        if (err) console.log(err);
        else res.json(doc);
      }
    );
  });
};
