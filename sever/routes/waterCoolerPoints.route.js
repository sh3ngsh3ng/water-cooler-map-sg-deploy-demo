module.exports = app => {
  const waterCoolerPoints = require("../controllers/waterCoolerPoints.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", waterCoolerPoints.create);

  // Retrieve all waterCoolerPoints
  router.get("/", waterCoolerPoints.findAll);

  // Retrieve all published waterCoolerPoints
  router.get("/published", waterCoolerPoints.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", waterCoolerPoints.findOne);

  // Update a Tutorial with id
  router.put("/:id", waterCoolerPoints.update);

  // Delete a Tutorial with id
  router.delete("/:id", waterCoolerPoints.delete);

  // Create a new Tutorial
  router.delete("/", waterCoolerPoints.deleteAll);

  app.use("/api/points", router);
};