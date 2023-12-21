const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

module.exports = app => {
  const waterCoolerPoints = require("../controllers/waterCoolerPoints.controller.js");

  const router = require("express").Router();

  // Create a new waterCoolerPoints
  router.post("/", upload.single('image'), waterCoolerPoints.create);

  // Retrieve all waterCoolerPoints
  router.get("/", waterCoolerPoints.findAll);

  router.get("/search", waterCoolerPoints.searchKeywords);

  router.post("/upload", upload.single('image'), waterCoolerPoints.uploadImage);

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