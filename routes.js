module.exports = (app, db) => {
  app.post("/recipes", (req, res) => {
    console.log(req.body);
    console.log("posted");
  });
};
