const express = require('express'),
  deleteFieldsRoute = express.Router(),
  multer = require('multer'),
  upload = multer(),
  fieldsHelper = require('./keysHelper'),
  schemasModel = require('../../../../models/schemasModel');

deleteFieldsRoute.post('/', upload.none(), (req, res) => {
  fieldsHelper.deleteField(schemasModel, req, res);
});
exports.deleteFieldsRoute=deleteFieldsRoute;