let crudHelper = require('../crudHelper'),
  schemasModel = require('../../../models/schemasModel');

exports.deleteSchemaAndDoc = async (req, res) => {
  const message = await this.deleteDocById(req);
  await this.deleteSchemaOndbSchemas(req);
  if (message) {
    res.status(200).json(message);
  } else {
    res.status(200).json('db and doc deleted successfully');
  }
};

exports.deleteSchemaOndbSchemas = async req => {
  if (req.body.schemaName) {
    await schemasModel.mongo.findOneAndUpdate(
      {},
      {
        $pull: { dbSchemas: { schemaName: req.body.schemaName } }
      },
      { multi: false }
    );
  }
};

exports.deleteDocById = async req => {
  let schema = await crudHelper.getSchema(req);

  let tempModel = await crudHelper.createModel(
    schema.schemaFields,
    schema.schemaName
  );
  if (schema.documentId === '') {
    return 'no doc exists for this schema. Deleting dbSchemas doc entry';
  } else if (schema.documentId !== '') {
    await tempModel.findOneAndDelete({ _id: schema.documentId });
  }
};
