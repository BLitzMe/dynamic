const express = require('express'),
  multer = require('multer'),
  upload = multer(),
  createQuesDocRoute = express.Router(),
  crudHelper = require('../../crudHelper');

createQuesDocRoute.post('/', upload.none(), (req, res) => {
  createQuesDoc(req, res);
});

async function createQuesDoc(req, res) {
  let updatedDoc = await crudHelper.enterNewSchema(req, res);
  res.write(
    JSON.stringify({ message: 'newSchema Entered', updatedDoc: updatedDoc })
  );
  let schema = await crudHelper.getSchema(req);
  let newQuestionDoc = await crudHelper.intiOneDoc(schema);
  let allDocs = await crudHelper.getAllQuesDocs();
  res.write(
    JSON.stringify({
      message: 'new questions doc saved',
      newDoc: newQuestionDoc,
      allQuesDocs: allDocs
    })
  );
  res.end();
}
exports.createQuesDocRoute = createQuesDocRoute;
