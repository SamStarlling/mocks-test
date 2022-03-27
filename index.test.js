const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects } = require('assert');

//clojure (auto excute function - IFE) - call file methods
(async () => {
  const filePath = './mocks/empty-file-invalid.csv';
  const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
  const result = File.csvToJson(filePath);

  await rejects(result, rejection);
})();
