export interface DbSchemaObject {
  schemaName: string;
  schemaFields: Array<string>;
}

export interface DbSchemasObject {
  dbSchemas: Array<DbSchemaObject>;
}
