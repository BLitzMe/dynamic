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
