const express = require('express'),
  schemaTestRoute = express.Router(),
  multer = require('multer'),
  mongoose = require('mongoose'),
  schemasModel = require('../../models/schemasModel'),
  schemaFactory = require('./schemaFactory');

schemaTestRoute.get('/', (req, res) => {
  res.status(500).send(schemaFactory.modelsArray);
});

module.exports=schemaTestRoute;