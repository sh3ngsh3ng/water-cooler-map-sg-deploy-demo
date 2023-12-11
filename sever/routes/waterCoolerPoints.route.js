module.exports = app => {
  const waterCoolerPoints = require("../controllers/waterCoolerPoints.controller.js");

  var router = require("express").Router();

  // Create a new waterCoolerPoints
  router.post("/", waterCoolerPoints.create);

  // Retrieve all waterCoolerPoints
  router.get("/", waterCoolerPoints.findAll);

  router.get("/search", waterCoolerPoints.searchKeywords);

  // Retrieve all vertified waterCoolerPoints
  router.get("/vertified", waterCoolerPoints.findAllVertified);

  // Retrieve a single waterCoolerPoints with id
  router.get("/:id", waterCoolerPoints.findOne);

  // Update a waterCoolerPoints with id
  router.put("/:id", waterCoolerPoints.update);

  // Delete a waterCoolerPoints with id
  router.delete("/:id", waterCoolerPoints.delete);

  // Create a new waterCoolerPoints
  router.delete("/", waterCoolerPoints.deleteAll);

  app.use("/api/points", router);
};