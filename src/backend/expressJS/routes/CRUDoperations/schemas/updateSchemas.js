const express = require('express'),
  updateSchemasRoute = express.Router(),
  multer = require('multer'),
  upload = multer(),
  schemasModel = require('../../../models/schemasModel');

updateSchemasRoute.post('/updateSchemaName', upload.none(), (req, res) => {
  console.log(req.body);
  if (!req.body.schemaName) {
    res.status(500).json('please input schema name');
  } else if (!req.body.newSchemaName) {
    res.status(500).json('please input new schema name');
  } else if (req.body.schemaName && req.body.newSchemaName) {
    schemasModel.mongo
      .findOneAndUpdate(
        {
          'dbSchemas.schemaName': req.body.schemaName
        },
        {
          $set: {
            'dbSchemas.$.schemaName': req.body.newSchemaName
          }
        },
        // eslint-disable-next-line no-unused-vars
        (err, result) => {
          if (err) {
            console.log(err);
          }
        }
      )
      .catch(err => {
        res
          .status(500)
          .json(
            'error occured while setting new schema name for ' +
              req.body.schemaName +
              ' schema\n: ' +
              err
          );
      })
      .then(() => {
        res
          .status(200)
          .json(
            'the new schema name for ' +
              req.body.schemaName +
              ' schema was set successfully'
          );
      });
  }
});


exports.updateSchemasRoute = updateSchemasRoute;
