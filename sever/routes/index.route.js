const db = require("../models");
const WaterCoolerPoints = db.waterCoolerPoints;

module.exports = app => {
  const router = require("express").Router();

  // simple route
  router.get("/", (req, res) => {
    res.render("index.hbs")
  });
  router.get("/success", (req, res) => {
    res.render("success.hbs")
  });
  router.get("/add", (req, res) => {
    res.render("addPoints.hbs")
  });
  router.get("/about", (req, res) => {
    res.render("about.hbs")
  });
  router.get("/unverified", (req,res) => {
    WaterCoolerPoints.find({ verified: false })
    .then(data => {
      res.render('unverifiedTable.hbs', {
        data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving WaterCoolerPoint."
      });
    });
  });

  app.use("/", router);
};