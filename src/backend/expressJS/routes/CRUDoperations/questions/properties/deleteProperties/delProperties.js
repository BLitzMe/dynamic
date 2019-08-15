const express = require('express'),
  deletePropertiesRoute = express.Router(),
  multer = require('multer'),
  upload = multer(),
  deletePropertiesHelper=require('./delPropertiesHelper'),
  propHelper = require('../popertiesHelper');

deletePropertiesRoute.post('/deleteOneProperty', upload.none(), (req, res) => {
  //create model
  let tempModel = propHelper.createModel(
    req.body.schemaFields,
    req.body.schemaName
  );
  // find schema by
  if(deletePropertiesHelper.schemaExists(req)){
    
  }else if(!deletePropertiesHelper.schemaExists(req)){
    res.status(500).send('schema to search for doc not found');
  }
});
exports.deleteProperties = deletePropertiesRoute;
