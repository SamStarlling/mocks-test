const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects } = require('assert');

//clojure (auto excute function - IFE) - call file methods
(async () => {
  //Test when the file is empty
  {
    const filePath = './mocks/empty-file-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  };
  
  //Test when the file has invalid length
  {
    const filePath = './mocks/four-items-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  };
  
  //Test when the file has invalid properties
  {
    const filePath = './mocks/four-items-invalid.csv';
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  };

})();
