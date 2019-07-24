const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  dbConfig = require('../database/db.index'),
  app = express(),
  getSchemasModelRoute = require('./routes/CRUDoperations/getSchemas'),
  postSchemasModelRoute = require('./routes/CRUDoperations/postSchemas'),
  deleteSchemaModelRoute = require('./routes/CRUDoperations/deleteSchemas'),
  schemaFactoryRoute = require('./routes/schemaFactory/schemaFactory'),
  schemaTestRoute = require('./routes/schemaFactory/schemaTests');

//express definitions
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

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
app.use('/postDatabaseSchemas', postSchemasModelRoute);
app.use('/deleteDatabaseSchemas', deleteSchemaModelRoute);
app.use('/bootSchemaFactory', schemaFactoryRoute.schemaFactoryRoute);
app.use('/schemaTestRoute', schemaTestRoute);
app.listen(port);
console.log('Listening on port ' + port);
