const appHelper = require('../../app.helper'),
  mongoose = require('mongoose'),
  schemasModel = require('../../models/schemasModel'),
  quesDocModel = require('../../models/questionsDocModel');

let globalModelsArray = appHelper.savedModelsArray;
exports.createModel = function createModel(
  schemaFields,
  schemaName,
  fieldUpdateFlag = false
) {
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
    schemaName,
    tempSchema,
    fieldUpdateFlag
  );
  return tempModel;
};
exports.updateSchemadocId = async function updatedocId(schemaName, docId) {
  await schemasModel.mongo.findOneAndUpdate(
    {
      'dbSchemas.schemaName': schemaName
    },
    {
      $set: {
        'dbSchemas.$.documentId': docId
      }
    }
  );
};
exports.enterNewFieldsToSchema = async function enterNewFields(req) {
  let newDoc = await schemasModel.mongo.findOneAndUpdate(
    {
      'dbSchemas.schemaName': req.body.schemaName
    },
    {
      $push: {
        'dbSchemas.$.schemaFields': req.body.newQuestionKey
      }
    },
    { new: true }
  );
  return newDoc;
};
exports.removeField = async function removeField(req) {
  let newSchemaDoc = await schemasModel.mongo.findOneAndUpdate(
    {
      'dbSchemas.schemaName': req.body.schemaName
    },
    {
      $pull: {
        'dbSchemas.$.schemaFields': req.body.keyToRemove
      }
    },
    { new: true }
  );
  return newSchemaDoc;
};
exports.getSchema = async req => {
  let schema;
  let result = await schemasModel.mongo.findOne(
    //* step four
    { 'dbSchemas.schemaName': req.body.schemaName },
    'dbSchemas.$',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
  schema = result.dbSchemas[0];
  return schema;
};
exports.shakeMongooseArray = function shakeMongooseArray(propertyCollection) {
  let shakenProperties = [];

  for (let prop in propertyCollection) {
    let localIsNum = parseInt(prop, 10);
    // eslint-disable-next-line no-empty
    if (isNaN(localIsNum)) {
    } else {
      shakenProperties.push(propertyCollection[localIsNum]);
    }
  }
  return shakenProperties;
};
/* function fieldObject(fieldName, fieldOptions) {
  (this.fieldName = fieldName), (this.fieldOptions = fieldOptions);
}  */
exports.getAllQuesDocs = async () => {
  let allQuesDocs = await quesDocModel.questionsDocModel.find({});
  return allQuesDocs;
};
exports.newQuesObj = function newQuesObj(
  questionKey,
  questionValue,
  questionOptions
) {
  this.questionKey = questionKey;
  this.questionValue = questionValue;
  this.questionOptions = questionOptions;
};

exports.deleteSchemaOndbSchemas = async req => {
  let newDoc;
  if (req.body.schemaName) {
    newDoc = await schemasModel.mongo.findOneAndUpdate(
      {},
      {
        $pull: { dbSchemas: { schemaName: req.body.schemaName } }
      },
      { multi: false, new: true }
    );
  }
  return newDoc;
};
exports.enterNewSchema = async function enterNewSchema(req, res) {
  let fieldsCsv = req.body.schemaFields;
  let schemaFields = fieldsCsv.split(',');

  let updatedDoc;
  let newdbSchema = {
    schemaName: req.body.schemaName, //!!
    schemaFields: schemaFields, //!!
    documentId: req.body.documentId
  };
  let badSchemaField = false;
  for (let field of schemaFields) {
    if (
      field ===
      ('once' ||
        'on' ||
        'emit' ||
        '_events' ||
        'db' ||
        'get' ||
        'set' ||
        'init' ||
        'isNew' ||
        'errors' ||
        'schema' ||
        'options' ||
        'modelName' ||
        'collection' ||
        '_pres' ||
        '_posts' ||
        'toObject')
    ) {
      badSchemaField = true;
    }
  }
  if (badSchemaField === true) {
    res.write(
      JSON.stringify({
        message: "valid field name wasn't entered. Please try again"
      })
    );
  } else {
    console.log(
      'this is how the new schema looks like ' + '\n' + newdbSchema + '\n'
    );
    //console.log('id of the dbSchemas object ' + req.body._id);
    updatedDoc = await schemasModel.mongo.findOneAndUpdate(
      {
        // search for the first document in the databaseschemas collection that has an
        //array of dbschemas object and append the new object at the end
      },
      {
        $push: {
          dbSchemas: newdbSchema
        }
      },
      { new: true }
    );
    return updatedDoc;
  }
};
exports.intiOneDoc = async function initOneDoc(schema) {
  let quesObjToAttach = {};
  let quesObjArray = [];
  let newSavedDoc;
  if (schema.documentId === '') {
    /* let schemaFields = crudHelper.shakeMongooseArray(schema.schemaFields); */
    for (let field of schema.schemaFields) {
      let tempQuesObj = new this.newQuesObj(field, '', []);
      quesObjArray.push(tempQuesObj);
    }
    quesObjToAttach = Object.assign(
      {},
      {
        schemaName: schema.schemaName,
        questions: quesObjArray
      }
    );
    let newModel = await quesDocModel.questionsDocModel(quesObjToAttach);
    newSavedDoc = await newModel.save();
    let docId = newSavedDoc._id;
    await this.updateSchemadocId(schema.schemaName, docId);
  }
  return newSavedDoc;
};

exports.updateSchemaNameOnDbSchemasDoc = async req => {
  let updatedDoc;
  updatedDoc = await schemasModel.mongo.findOneAndUpdate(
    {
      'dbSchemas.schemaName': req.body.currentSchemaName
    },
    {
      $set: {
        'dbSchemas.$.schemaName': req.body.newSchemaName
      }
    },
    // eslint-disable-next-line no-unused-vars
    { new: true }
  );

  return updatedDoc;
};
