//this is the get properties route because it ends up being
const express = require('express'),
  getPropertiesRoute = express.Router(),
  _ = require('lodash'),
  appHelper = require('../../../app.helper'),
  propHelper = require('./popertiesHelper'),
  schemasModel = require('../../../models/schemasModel');
let docIdToFind;
/* getPropertiesRoute.get('/', (req, res) => {
  // create the model to find the collection of

  console.log(docIdToFind);
});
 */
getPropertiesRoute.post('/getQuestionsDocs', (req, res) => {
  if (req.body.collectionName && req.body.schemaFields) {
    //find the collection's docId
    let tempModel = propHelper.createModel(
      req.body.schemaFields,
      req.body.collectionName
    );

    schemasModel.mongo.findOne(
      { 'dbSchemas.schemaName': req.body.collectionName },
      'dbSchemas.$',
      (err, doc) => {
        docIdToFind = doc.dbSchemas[0].documentId;
        console.log(docIdToFind);
        tempModel.findOne({ _id: docIdToFind }, (err, doc) => {
          if (err) {
            console.log(err);
          } else {
            console.log(doc);
            res.status(200).send(doc);
          }
        });
      }
    );
  } else {
    //find all dbSchemas for which a document exists on the db

    schemasModel.mongo.find({}, (err, result) => {
      let tempArr = result[0].dbSchemas;
      console.log(tempArr);
      propHelper.sendDocsArray(res, tempArr);
      // res.status(200).send(result);
    });
  }
});

exports.getPropertiesRoute = getPropertiesRoute;
