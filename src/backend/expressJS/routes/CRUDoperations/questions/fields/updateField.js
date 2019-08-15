const express = require('express'),
  updateFieldsRoute = express.Router(),
  multer = require('multer'),
  upload = multer(),
  fieldsHelper = require('./fieldsHelper'),
  schemasModel = require('../../../../models/schemasModel');

updateFieldsRoute.post('/updateField', upload.none(), (req, res) => {
  fieldsHelper.updateFields(schemasModel, req, res);
});

exports.updateFieldsRoute = updateFieldsRoute;
