const db = require("../models");
const WaterCoolerPoints = db.waterCoolerPoints;

// Create and Save a new WaterCoolerPoints
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a WaterCoolerPoints
  const waterCoolerPoint = new WaterCoolerPoints({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save WaterCoolerPoints in the database
  waterCoolerPoint
    .save(waterCoolerPoint)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the WaterCoolerPoint."
      });
    });
};

// Retrieve all WaterCoolerPoint from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  WaterCoolerPoints.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving WaterCoolerPoint."
      });
    });
};

// Find a single WaterCoolerPoint with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  WaterCoolerPoints.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found WaterCoolerPoint with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving WaterCoolerPoint with id=" + id });
    });
};

// Update a WaterCoolerPoints by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  WaterCoolerPoints.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update WaterCoolerPoint with id=${id}. Maybe WaterCoolerPoint was not found!`
        });
      } else res.send({ message: "WaterCoolerPoint was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating WaterCoolerPoint with id=" + id
      });
    });
};

// Delete a WaterCoolerPoint with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  WaterCoolerPoints.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete WaterCoolerPoint with id=${id}. Maybe WaterCoolerPoint was not found!`
        });
      } else {
        res.send({
          message: "WaterCoolerPoint was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete WaterCoolerPoint with id=" + id
      });
    });
};

// Delete all WaterCoolerPoint from the database.
exports.deleteAll = (req, res) => {
  WaterCoolerPoints.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} WaterCoolerPoint were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all WaterCoolerPoint."
      });
    });
};

// Find all published WaterCoolerPoint
exports.findAllVertified = (req, res) => {
  WaterCoolerPoints.find({ vertified: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving WaterCoolerPoint."
      });
    });
};

exports.searchKeywords = (req, res) => {
  const keywords = req.query.keywords
  const condition = keywords ? { name: { $regex: new RegExp(keywords), $options: "i" } } : {};
  WaterCoolerPoints.find(condition).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving WaterCoolerPoint."
    });
  });
};