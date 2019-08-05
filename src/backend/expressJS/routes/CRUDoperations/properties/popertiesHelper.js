const schemasModel = require('../../../models/schemasModel'),
  mongoose = require('mongoose'),
  express = require('express'),
  Schema = mongoose.Schema,
  _ = require('lodash'),
  omit = require('lodash/omit');
appHelper = require('../../../app.helper');

let globalModelsArray = appHelper.savedModelsArray;
exports.updateFields = function updateFields(
  tempModel,
  fieldsToUpdateArray,
  docId = 'default',
  collectionName = 'defaultCollName'
) {
  let searchParams = {};
  if (docId !== 'default') {
    searchParams = { _id: docId }; //take care of the case where new document is saved and the id is available
  } //if the document was already there, simply update
  fieldsToUpdateArray.forEach(element => {
    tempModel.findOneAndUpdate(searchParams, {
      $Set: { [element.key]: element.value }
    });
  });
  //update the doc id after the creation of new document for the said schema
  //when the arguements are provided
  if (docId !== 'default' && collectionName !== 'defaultCollName') {
    this.updateSchemadocId(collectionName, docId);
  }
};
exports.updateSchemadocId = function updatedocId(
  collectionName,
  docId,
  res,
  req
) {
  schemasModel.mongo
    .findOneAndUpdate(
      {
        'dbSchemas.schemaName': collectionName
      },
      {
        $set: {
          'dbSchemas.$.documentId': docId
        }
      }
    )
    .then(() => {});
};

exports.enterNewSchema = function enterNewSchema(newSchema, schemasModel) {
  console.log(
    'this is how the new schema looks like ' + '\n' + newSchema + '\n'
  );
  //console.log('id of the dbSchemas object ' + req.body._id);
  schemasModel.mongo
    .findOneAndUpdate(
      {
        // search for the first document in the databaseschemas collection that has an
        //array of dbschemas object and append the new object at the end
      },
      {
        $push: {
          dbSchemas: newSchema
        }
      }
    )
    .then(log => {
      console.log('the schema has been saved and here is the log \n' + log);
      res.status(200).send('new schema saved successfully');
    });
};

exports.enterNewFieldsToSchema = function enterNewFields(
  schemasModel,
  res,
  req
) {
  schemasModel.mongo
    .updateOne(
      {
        'dbSchemas.schemaName': req.body.collectionName
      },
      {
        $push: {
          'dbSchemas.$.schemaFields': req.body.newField
        }
      }
    )
    .then(() => {
      res.send('new field added successfully');
    });
};

//functions to create schemas

exports.createModel = function createModel(schemaFields, collectionName) {
  let tempSchema = new mongoose.Schema({});
  let tempObject = {};
  //create schema on the fly and then the model so functions can be performed on it

  schemaFields.forEach(element => {
    tempObject = Object.assign(
      {},
      {
        ...tempObject,

        [element]: typeof element
      }
    );
  });
  tempSchema.add(tempObject);

  // search global models array for the model, if not, creat it and get the model instance back
  let tempModel = appHelper.checkModelExistence(
    globalModelsArray,
    collectionName,
    tempSchema
  );
  return tempModel;
};

exports.constructKeyValArray = function keyValArray(
  schemaFieldsArray,
  fieldsToUpdateArray
) {
  let tempArray = schemaFieldsArray;
  let tempArrayTwo = [];
  let keyValArray = [];
  //* strict copy the filedstoupdatearray into key val array.

  field = tempArray[0];
  fieldsToUpdateArray.forEach(element => {
    let temp;
    temp = new keyValObj(element.key, element.value);
    keyValArray.push(temp);
    tempArrayTwo.push(element.key);
    /* if (element.key === field && element.value !== '') {
      temp = new keyValObj(element.key, element.value);
      keyValArray.push(temp);
    } else if (element.key === field && element.value === '') {
      temp = new keyValObj(element.key, '');
      keyValArray.push(temp);
    }
    tempArray = _.pull(tempArray, tempArray[0]);
  }); */
  });
  //* Then take difference of an array with key values of FTUArray and schema fields arry

  let diff = _.difference(tempArray, tempArrayTwo); //* then simply add the keys of the difference array with empty values to

  //* the key val array
  for (element of diff)
    element => {
      let temp;
      temp = this.keyValObj(element, '');
      keyValArray.push(temp);
    };
  return keyValArray;
};

function keyValObj(key, val) {
  this.key = key;
  this.val = val;
}
exports.createDocsArray = async function createDocsArray(arrayToLoopForIds) {
  let docsToSend = [];
  for (let obj of arrayToLoopForIds) {
    let tempModel = this.createModel(obj.schemaFields, obj.schemaName);
    if (obj.documentId === '') {
      continue;
    }
    let doc = await tempModel.findOne({ _id: obj.documentId });
    console.log(doc);
    docsToSend.push(doc);
  }
  return docsToSend;
};

//create complete schema objects for front end template
exports.sendDocsArray = async function(res, arrayToLoopForIds) {
  let docsArray = [];
  let docKeyValues = [];
  //get the doc with question fields filled
  docsArray = await this.createDocsArray(arrayToLoopForIds);
  docsArray = _.pull(docsArray, null);
  //build schema objects with answers fields
  let myArr = [];
  myArr = assignAnswers(arrayToLoopForIds, docsArray);
  console.log(docsArray);
  res.status(200).send(myArr);
};

function assignAnswers(schemasArrayInput, inputArray) {
  let transformedSchemaArray = insertObjAnswersProp(schemasArrayInput);
  const tempArray = [];
  let quesArray = inputArray[0]._doc;
  // Only one key has to exist in the quesArray
  for(let prop in quesArray){
  for (let schema of transformedSchemaArray  {
    // if ther is one property on the quesitons object that matches the
    // schema fields
    for(let field of schema.schemaFields[0] ){
    if (
      quesArray.hasOwnProperty(field)
    ) {
      let tempEle = {};
      tempEle = Object.assign(
        {},
        {
          ...transformedSchemaArray[schema],
          quesAnsObj: quesArray[0]
        }
      );
      tempArray.push(tempEle);
      break;
      // make a new object on the schema object that contains the schema fields
      // simply insert the questions object onto the schema object
    }}}
    quesArray = _.pull(quesArray, quesArray[0]);
    schema = 0;
  }
  return tempArray;
}

function insertObjAnswersProp(schemasArrayInput) {
  console.log(schemasArrayInput);
  let tempArray = [];
  let tempEle = {};
  schemasArrayInput.forEach(ele => {
    console.log(
      '--------------------the current tempEle is------------------------------\n'
    );
    console.log(ele);

    tempEle = Object.assign({}, { ...ele._doc, quesAnsObj: {} });
    console.log(
      '--------------------the current temp ele is------------------------------\n'
    );
    console.log(tempEle);
    tempArray.push(tempEle);
  });
  return tempArray;
}
