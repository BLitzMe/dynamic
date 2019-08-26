const answersDocModel = require('../../../models/answersModel'),
  _ = require('lodash');

exports.getAllAnsDocsLatestFirst = async res => {
  let plainAllAns = await answersDocModel.answersModel.find({});
  let sortedAnsDocs = _.sortBy(plainAllAns, ans => {
    return new Date(ans.date);
  }).reverse();
  res.status(200).json(sortedAnsDocs);
};
exports.generateJSON = async (req, res) => {
  console.log(req.body);
  let recDate = new Date(req.body.date);
  let allDocs = await answersDocModel.answersModel.find({});
  let docToConvert;
  let jsonTOSend;
  for (let doc of allDocs) {
    if (doc.date.getTime() === recDate.getTime()) {
      docToConvert = doc;
    }
  }
  for (let obj of docToConvert.answerObj) {
    jsonTOSend = Object.assign(
      {},
      {
        ...jsonTOSend,
        [obj.questionKey]: obj.answerKey
      }
    );
  }
  res.write(JSON.stringify(jsonTOSend));
  res.end();
};
