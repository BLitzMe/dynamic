//this is the get properties route because it ends up being
const express = require('express'),
  getPropertiesRoute = express.Router(),
  getPropHelper = require('./getPropHelper'),
  crudHelper = require('../../../crudHelper'),
  schemasModel = require('../../../../../models/schemasModel');
let docIdToFind;

getPropertiesRoute.post('/getQuestionsDocs', (req, res) => {
  //*for a single doc
  if (req.body.collectionName && req.body.schemaFields) {
    //find the collection's docId
    let tempModel = crudHelper.createModel(
      req.body.schemaFields,
      req.body.collectionName
    );

    schemasModel.mongo.findOne(//extract document id
      { 'dbSchemas.schemaName': req.body.collectionName },
      'dbSchemas.$',
      (err, doc) => {
        docIdToFind = doc.dbSchemas[0].documentId;

        tempModel.findOne({ _id: docIdToFind }, (err, doc) => {//find doc pertaining to that id
          if (err) {
            console.log(err);
          } else {
            console.log(doc);
            res.status(200).send(doc);
          }
        });
      }
    );
  } else {//*for all docs
    //find all dbSchemas for which a document exists on the db and construct an
    //array of all schemas with it
    
    
      getPropHelper.sendDocsArray(res);
    
  }
});

exports.getPropertiesRoute = getPropertiesRoute;
