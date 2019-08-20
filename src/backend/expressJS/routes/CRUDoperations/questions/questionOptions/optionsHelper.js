const quesDocModel = require('../../../../models/questionsDocModel');

exports.insertNewOptions = async (req, res) => {
  let updatedDoc;
  if (req.body.newOptions === undefined || req.body.newOptions.length === 0) {
    res.status(500).json({ message: 'no question options sent' });
  } else if (req.body.newOptions.length > 1) {
    updatedDoc = await quesDocModel.questionsDocModel.findOneAndUpdate(
      { 'questions.questionKey': req.body.questionKey },
      {
        $push: {
          'questions.$.questionOptions': { $each: req.body.newOptions }
        }
      },
      { new: true }
    );
    res.status(200).json({
      message: 'options updated successfully',
      updatedDoc: updatedDoc
    });
  } else if (req.body.newOptions.length === 1) {
    updatedDoc = await quesDocModel.questionsDocModel.findOneAndUpdate(
      { 'questions.questionKey': req.body.questionKey },
      {
        $push: {
          'questions.$.questionOptions': req.body.newOptions
        }
      },
      { new: true }
    );
    res.status(200).json({
      message: 'options updated successfully',
      updatedDoc: updatedDoc
    });
  }
};
exports.insertNewOptionsWrapper = async (req, res) => {
  await this.insertNewOptions(req, res);
  res.status(200).end();
};
exports.updateAnOption = async (req, res) => {
  await delOptions(req, res);
  await this.insertNewOptions(req, res);
  res.status(200).end();
};

exports.delOptionsWrapper = async (req, res) => {
  let updatedDoc = await delOptions(req, res);
  res.write(
    JSON.stringify({
      message: 'the seleted option to delete was deleted',
      optionToDel: req.body.optionsToDelete,
      udpatedDoc: updatedDoc
    })
  );
  res.status(200).end();
};
async function delOptions(req, res) {
  let updatedDoc;
  if (
    req.body.optionsToDelete.length === 0 ||
    req.body.optionsToDelete === undefined
  ) {
    res.write(JSON.stringify({ message: 'no options chosen to delete' }));
    res.status(500).end();
  } else {
    for (let option of req.body.optionsToDelete) {
      updatedDoc = await quesDocModel.questionsDocModel.findOneAndUpdate(
        {
          'questions.questionKey': req.body.questionKey
        },
        {
          $pull: {
            'questions.$.questionOptions': option
          }
        },
        { new: true }
      );
    }
  }
  return updatedDoc;
}
