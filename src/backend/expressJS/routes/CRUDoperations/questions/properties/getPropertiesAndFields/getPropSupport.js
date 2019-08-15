const _ = require('lodash');

exports.swapSchema = function swapSchema(tempArray, objToCompare) {
  let currObj = {};
  let objExists = false;
  for (let obj of tempArray) {
    if (obj.schemaName === objToCompare.schemaName) {
      currObj = obj;
      objExists = true;
      break;
    }
  }
  if (objExists) {
    let currObjCount = countValues(currObj);
    let compareObjCount = countValues(objToCompare);
    if (currObjCount >= compareObjCount) {
      return tempArray;
    } else if (compareObjCount > currObjCount) {
      tempArray = _.pull(tempArray, currObj);
      tempArray.push(objToCompare);
      return tempArray;
    }
  } else {
    tempArray.push(objToCompare);
    return tempArray;
  }
};
function countValues(objToCountIn) {
  let count = 0;
  for (let ele in objToCountIn.quesStatementObj) {
    if (objToCountIn.quesStatementObj[ele] !== '') {
      count++;
    }
  }
  return count;
}

exports.attachQuesAnsObjKeys = function attachQuesAnsObjKeys(schema) {
  let propArray = [];
  for (let prop in schema.schemaFields) {
    //shake schema field values out of mongoose array
    let isNum = parseInt(prop, 10);
    // eslint-disable-next-line no-empty
    if (isNaN(isNum)) {
    } else {
      propArray.push(schema.schemaFields[isNum]);
    }
  }
  let quesStateEmptyObj = {};
  //make empty quesState object out of schema fields
  for (let prop of propArray) {
    quesStateEmptyObj = Object.assign(
      {},
      {
        ...quesStateEmptyObj,
        [prop]: ''
      }
    );
  }
  //attach prob object to quesStateObj property
  let schemaOnTest = this.attachEmptyQuesStateObj(quesStateEmptyObj, schema);
  return schemaOnTest;
};

exports.attachEmptyQuesStateObj = function attachEmptyQuesStateObj(
  emptyObj,
  schema
) {
  let tempSchema;

  tempSchema = Object.assign(
    {},
    {
      ...schema,
      quesStatementObj: emptyObj
    }
  );
  return tempSchema;
};
// populates the quesStatementObj
exports.populateQuesStateObj = function populateQuesStateObj(
  field,
  quesStateObjOnDoc,
  schemaOnTest,
  fieldExists
) {
  if (fieldExists === true) {
    for (let key in quesStateObjOnDoc) {
      if (key === field) {
        schemaOnTest = Object.assign(
          {},
          {
            ...schemaOnTest,
            quesStatementObj: {
              ...schemaOnTest.quesStatementObj,
              [key]: quesStateObjOnDoc[key]
            }
          }
        );
      }
    }
  } else if (fieldExists === false) {
    schemaOnTest = Object.assign(
      {},
      {
        ...schemaOnTest,
        quesStatementObj: {
          ...schemaOnTest.quesStatementObj,
          [field]: ''
        }
      }
    );
  }

  //attach it to current schema if it does
  return schemaOnTest;
};

exports.insertObjQuestionsProp = function insertObjQuestionsProp(
  schemasArrayInput
) {
  let tempArray = [];
  let tempEle = {};
  schemasArrayInput.forEach(ele => {
    tempEle = Object.assign({}, { ...ele._doc, quesStatementObj: {} });

    tempArray.push(tempEle);
  });

  return tempArray;
};
exports.checkSchemaExistence = function checkSchemaExistence(
  infoToCheck,
  currArray
) {
  let schemaExists = false;
  for (let j = 0; j <= currArray.length - 1; j++) {
    if (infoToCheck === currArray[j].schemaName) {
      schemaExists = true;
    }
  }
  return schemaExists;
};
