const getPropSupport = require('./getPropSupport'),
  propHelper = require('../popertiesHelper'),
  _ = require('lodash');

exports.sendDocsArray = async function(res, arrayToLoopForIds) {
  let docsArray = [];

  //get the doc with question fields filled
  docsArray = await createDocsArray(arrayToLoopForIds);
  docsArray = _.pull(docsArray, null);

  //build schema objects with answers fields
  let myArr = [];
  myArr = assignAnswers(arrayToLoopForIds, docsArray);

  res.status(200).json(myArr);
};
async function createDocsArray(arrayToLoopForIds) {
  let docsToSend = [];
  for (let obj of arrayToLoopForIds) {
    let tempModel = propHelper.createModel(obj.schemaFields, obj.schemaName);
    if (obj.documentId === '') {
      continue;
    }
    let doc = await tempModel.findOne(
      { _id: obj.documentId },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // if no doc was found for this id, remove the stored id
          
          if (result === null) {
            propHelper.updateSchemadocId(obj.schemaName, '');
          }
        }
      }
    );

    docsToSend.push(doc);
  }
  return docsToSend;
}

function assignAnswers(schemasArrayInput, mongoStatesArray) {
  // transform the mongoose document into iterable array with the quesAnsObj field attached to each object
  let transformedSchemaArray = getPropSupport.insertObjQuestionsProp(
    schemasArrayInput
  );
  let tempArray = [];
  let statesArray = [];

  // shake the mongoose statements array for the statements
  for (let ele of mongoStatesArray) {
    
    let obj = ele._doc;
    delete obj._id;
    delete obj.__v;
    
    statesArray.push(ele._doc);
  }
  // if  docs were found for any of the schemas,
  // attach the values for quesObj object
  if (statesArray.length > 0) {
    for (let quesStateObjOnDoc of statesArray) {
      // loop through each schema of transformed schemas array and each field of the schemaFields property of each schema
      for (let schema of transformedSchemaArray) {
        // if ther is one property on the quesitons object that matches the
        // schema fields
        if (schema.documentId === '') {
          //gather props from the schema fields array

          //attach prob object to quesObj property
          let schemaOnTest = getPropSupport.attachQuesAnsObjKeys(schema);
          // if the schema with this anme doesnt exist
          if (
            !getPropSupport.checkSchemaExistence(
              schemaOnTest.schemaName,
              tempArray
            )
          ) {
            tempArray.push(schemaOnTest);
          }

          /*  tempArray.push(schema); */
        } else if (schema.documentId !== '') {
          let schemaOnTest = schema;
          for (let field of schema.schemaFields) {
            //loop through all the fields and add kv pairs from
            // eslint-disable-next-line no-prototype-builtins
            if (quesStateObjOnDoc.hasOwnProperty(field)) {
              schemaOnTest = getPropSupport.populateQuesStateObj(
                field,
                quesStateObjOnDoc,
                schemaOnTest,
                true
              ); // eslint-disable-next-line no-prototype-builtins
            } else if (!quesStateObjOnDoc.hasOwnProperty(field)) {
              schemaOnTest = getPropSupport.populateQuesStateObj(
                field,
                quesStateObjOnDoc,
                schemaOnTest,
                false
              );
            }
            // assert that an obj has been attached and br  eak the loop
          }
          tempArray = getPropSupport.swapSchema(tempArray, schemaOnTest);
        }
      }
    }
  } else {
    // if no docs found, loop through the transformed schemas arraay
    //and attach the keys and empty object to quesansobj
    for (let schema of transformedSchemaArray) {
      let schemaOnTest = getPropSupport.attachQuesAnsObjKeys(schema);
      // if the schema with this anme doesnt exist
      if (!getPropSupport.checkSchemaExistence(schemaOnTest.schemaName, tempArray)) {
        tempArray.push(schemaOnTest);
      }
    }
  }
  // loop each obj in shaken statements array

  return tempArray;
}
