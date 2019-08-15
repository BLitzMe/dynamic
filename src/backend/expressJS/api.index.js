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
  updatePropertiesRoute = require('./routes/CRUDoperations/questions/properties/updateProperties'),
  getPropertiesRoute = require('./routes/CRUDoperations/questions/properties/getPropertiesAndFields/getProperties'),
  updateSchemasRoute = require('./routes/CRUDoperations/schemas/updateSchemas'),
  updateFieldsRoute = require('./routes/CRUDoperations/questions/fields/updateField'),
  deleteField = require('./routes/CRUDoperations/questions/fields/delField');

//express definitions
/* app.use(
  bodyParser.urlencoded({
    extended: true
  })
); */

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
app.use('/updateProperties', updatePropertiesRoute.updatePropertiesRoute);
app.use('/getProperties', getPropertiesRoute.getPropertiesRoute);
app.use('/updateSchema', updateSchemasRoute.updateSchemasRoute);
app.use('/deleteField', deleteField.deleteFieldsRoute);
app.use('/updateField', updateFieldsRoute.updateFieldsRoute);
app.listen(port);
console.log('Listening on port ' + port);
