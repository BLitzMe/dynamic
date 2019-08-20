const quesDocModel = require('../../../../../models/questionsDocModel'),
  crudHelper = require('../../../crudHelper');

exports.createFieldsObject = (tempObj, keyValueEle) => {
  tempObj = Object.assign(
    {},
    {
      ...tempObj,
      [keyValueEle.key]: {
        question: keyValueEle.value,
        ...tempObj.key.fieldOptions
      }
    }
  );
  return tempObj;
};

/* exports.createAndUpdateQuestionsDoc = async req => {
  //*create a ques doc
  let quesModel;
  quesModel = await new quesDocModel.questionsDocModel();

  let savedDoc = await quesModel.save();
  let savedDocId = savedDoc._id;
  await crudHelper.updateSchemadocId(req.body.schemaName, savedDocId);

  //*update this doc
  //create new question array
  let newObj = Object.assign({}, newObj);
  newObj.questionKey = req.body.questionKey;
  newObj.questionValue = req.body.questionValue;
  //!!must be sent. if not values send empty array
  newObj.questionOptions = req.body.questionOptions;
  await quesDocModel.findByIdAndUpdate(
    { _id: savedDocId },
    {
      $set: {
        schemaName: req.body.schemaName
      },
      $push: {
        questions: newObj
      }
    }
  );
}; */
exports.updateQuestionValue = async (req, res) => {
  if (req.body.questionValue === '') {
    res.status(500).json('no question Value was sent.');
  }
  await quesDocModel.questionsDocModel.findOneAndUpdate(
    { 'questions.questionKey': req.body.questionKey },
    {
      $set: {
        'questions.$.questionValue': req.body.questionValue
      }
    }
  );
  let docs = await crudHelper.getAllQuesDocs();
  res.status(200).json(docs);
};
