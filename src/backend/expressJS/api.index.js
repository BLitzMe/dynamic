const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  dbConfig = require('../database/db.index'),
  app = express(),
  appHelper = require('./app.helper'),
  getSchemasModelRoute = require('./routes/CRUDoperations/schemas/getSchemas'),
  postSchemasModelRoute = require('./routes/CRUDoperations/schemas/postSchemas'),
  deleteSchemaModelRoute = require('./routes/CRUDoperations/schemas/deleteSchemas'),
  schemaFactoryRoute = require('./routes/factories/schemas/schemaFactory'),
  schemaTestRoute = require('./routes/factories/schemas/schemaTests'),
  modelsFactoryRoute = require('./routes/factories/modelstosend/modelsFactory'),
  updateValuesRoute = require('./routes/CRUDoperations/questions/questionValues/updateValues/updateValues'),
  getPropertiesRoute = require('./routes/CRUDoperations/questions/questionValues/getPropertiesAndFields/getProperties'),
  updateSchemasRoute = require('./routes/CRUDoperations/schemas/updateSchemas'),
  updateKeysRoute = require('./routes/CRUDoperations/questions/questionKeys/updateKeys'),
  //deleteField = require('./routes/CRUDoperations/questions/fields/delField'),
  initDocs = require('./routes/CRUDoperations/initDocs'),
  updateOptionsRoute = require('./routes/CRUDoperations/questions/questionOptions/updateOptions'),
  getAllQuestions = require('./routes/CRUDoperations/questions/getAllQuestions'),
  addQeustionRoute = require('./routes/CRUDoperations/questions/addAQuestion'),
  deleteQuestionRoute = require('./routes/CRUDoperations/questions/deleteAQuestion'),
  delquesDocRoute = require('./routes/CRUDoperations/questions/quesDocs/delQuesDoc'),
  createQuesDocRoute = require('./routes/CRUDoperations/questions/quesDocs/createQuesDoc'),
  delOptionsRoute = require('./routes/CRUDoperations/questions/questionOptions/delOption'),
  updateSchemaNameOnQuesDoc = require('./routes/CRUDoperations/questions/quesDocs/updateSchemaNameOnDoc'),
  createAnswersDocRoute = require('./routes/CRUDoperations/answers/createAnswersDoc'),
  getAnswersDocsRoute = require('./routes/CRUDoperations/answers/getAnswerDocs'),
  getJsonObjectRoute = require('./routes/CRUDoperations/answers/getJsonObj');
//express definitions
/* app.use(
  bodyParser.urlencoded({
    extended: true
  })
); */
app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json');
  next();
});
app.use(bodyParser.json());
app.use(cors());

app.locals.modelsArray = appHelper.savedModelsArray;

//serve sale images folder
/* app.use('/getSaleItemImage', express.static('./saleimages/'));
 */

//mongoose setup
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
let mongooseConfig = {
  useNewUrlParser: true
};

//set to use new url parser
mongoose.connect(dbConfig.DB, mongooseConfig).then(
  () => {
    console.log('website database is connected');
  },
  err => {
    console.log('Cant connect to website database' + err);
  }
);
const port = process.env.PORT || 4000;
app.use('/getDatabaseSchemas', getSchemasModelRoute);
app.use('/postDatabaseSchemas', postSchemasModelRoute.postSchemasModelRoute);
app.use('/deleteDatabaseSchemas', deleteSchemaModelRoute);
app.use('/bootSchemaFactory', schemaFactoryRoute.schemaFactoryRoute);
app.use('/schemaTestRoute', schemaTestRoute.schemaTestRoute);
app.use('/modelsFactoryRoute', modelsFactoryRoute);
app.use('/updateQuestionValues', updateValuesRoute.updateValuesRoute);
app.use('/getProperties', getPropertiesRoute.getPropertiesRoute);
app.use('/updateSchema', updateSchemasRoute.updateSchemasRoute);
//app.use('/deleteField', deleteField.deleteFieldsRoute);
app.use('/updateQuestionKey', updateKeysRoute.updateKeysRoute);
app.use('/initDocs', initDocs.initDocsRoute);
app.use('/getAllQuestions', getAllQuestions.getAllQuestionsRoute);
app.use('/updateQuestionOptions', updateOptionsRoute.updateQuestionOptions);
app.use('/addAQuestion', addQeustionRoute.addQuestionRoute);
app.use('/deleteAQuestion', deleteQuestionRoute.delQuestionsRoute);
app.use('/deleteQuestionDocument', delquesDocRoute.delQuesDocRoute);
app.use('/createQuesDoc', createQuesDocRoute.createQuesDocRoute);
app.use('/delOptions', delOptionsRoute.delOptionsRoute);
app.use(
  '/updateSchemaNameOnQuesDoc',
  updateSchemaNameOnQuesDoc.updateSchemaNameRoute
);
app.use('/createAnswersDoc', createAnswersDocRoute.createAnswersDocRoute);
app.use('/getAnswerDocs', getAnswersDocsRoute.getAllAnswersDocsRoute);
app.use('/getJsonObject', getJsonObjectRoute.getJsonRoute);

app.listen(port);
console.log('Listening on port ' + port);
