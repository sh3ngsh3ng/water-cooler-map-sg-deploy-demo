const db = require("../models");
const WaterCoolerPoints = db.waterCoolerPoints;
const sharp = require('sharp');
const utils = require("../utils.js");


// Create and Save a new WaterCoolerPoints
exports.create = async (req, res) => {
  let data = {};
  // Validate request
  if (req.body) {
    let { name, postcode, level, latitude, longitude, description, operator, temperature } = req.body;
    if (!name) {
      res.status(400).send({ message: "Location name can not be empty!" });
      return;
    } else if (!latitude || !longitude) {
      const latLongData = await utils.getLatLong(postcode, name)
      if (Number(latLongData.latt) > 0 && Number(latLongData.longt) > 0){
        latitude = Number(latLongData.latt)
        longitude = Number(latLongData.longt)
      }
    }
    data = {
      name, postcode, level, latitude, longitude, description, operator, temperature: temperature ? Array.isArray(temperature) ? temperature.join(',') : temperature : '', source: 'form', verified: false, verifiedBy: ''
    }
  }

  if (req.file) {
    const maxWidth = 1000;
    const maxHeight = 1000;
    const outputDirectory = 'uploads';
    const inputFile = req.file;
    try {
      // Maximum width and height for resizing
      await sharp(inputFile.path)
        .resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality: 80, progressive: true }) // Progressive JPEGs
        .webp({ quality: 80 }) // Convert to WebP format
        .toFile(`${outputDirectory}/${inputFile.originalname}`);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error compressing image');
    }
    const imageObj = await utils.uploadToCloudinary(`${outputDirectory}/${inputFile.originalname}`)
    if (imageObj.secure_url) {
      data.image = imageObj.secure_url
    }
  } else {
    data.image = ''
  }

  // Create a WaterCoolerPoints
  const waterCoolerPoint = new WaterCoolerPoints(data);

  // Save WaterCoolerPoints in the database
  waterCoolerPoint
    .save(waterCoolerPoint)
    .then(data => {
      res.render('success.hbs', {
        name: data.name
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the WaterCoolerPoint."
      });
    });
};

//Upload image to cloud
exports.uploadImage = async (req, res) => {
  if (req.file) {
    const maxWidth = 1000;
    const maxHeight = 1000;
    const outputDirectory = 'uploads';
    const inputFile = req.file;
    try {
      // Maximum width and height for resizing
      await sharp(inputFile.path)
        .resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality: 80, progressive: true }) // Progressive JPEGs
        .webp({ quality: 80 }) // Convert to WebP format
        .toFile(`${outputDirectory}/${inputFile.originalname}`);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error compressing image');
    }
    const imageObj = await utils.uploadToCloudinary(`${outputDirectory}/${inputFile.originalname}`)
    if (imageObj.secure_url) {
      res.status(200).send({
        image: imageObj.secure_url
      })
    }
  } else {
    return res.status(400).send({message: 'image to update cannot be empty!'})
  }
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
  WaterCoolerPoints.findByIdAndDelete(id)
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