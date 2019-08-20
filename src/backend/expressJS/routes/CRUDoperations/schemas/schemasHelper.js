let crudHelper = require('../crudHelper'),
  quesDocModel = require('../../../models/questionsDocModel');

exports.deleteSchemaAndDoc = async (req, res) => {
  const message = await this.deleteDocById(req);
  await crudHelper.deleteSchemaOndbSchemas(req);
  if (message) {
    res.status(200).json(message);
  } else {
    res.status(200).json('db and doc deleted successfully');
  }
};

exports.deleteDocById = async req => {
  let schema = await crudHelper.getSchema(req);

  if (schema.documentId === '') {
    return 'no doc exists for this schema. Deleting dbSchemas doc entry';
  } else if (schema.documentId !== '') {
    await quesDocModel.questionsDocModel.findOneAndDelete({
      _id: schema.documentId
    });
  }
};
