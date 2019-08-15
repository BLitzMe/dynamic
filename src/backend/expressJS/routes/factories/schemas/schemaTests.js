const express = require('express'),
  schemaTestRoute = express.Router(),
  multer = require('multer'),
  upload = multer();

schemaTestRoute.post('/ew', upload.none(), (req, res) => {
  res.status(200).json(req.body);
});

exports.schemaTestRoute = schemaTestRoute;
