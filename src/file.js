const { readFile } = require('fs/promises');
const { join } = require('path');

//Object with validations
const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: [ 'id', 'name', 'profession', 'age' ]
};

class File {
  static async csvJson(filePath) {
    const content = await File.getFileContent(filePath);
    return content;
  }

  static async getFileContent(filePath) {
    //Get file path
    const fileName = join(__dirname, filePath);

    //Convert file content to brazilian format
    return ( await readFile(fileName)).toString('utf8');
  }
}

//clojure (auto excute function - IFE) - call file methods
(async () => {
  const result = await File.csvJson('./../mocks/three-items-valid.csv');
  console.log('result', result);
})();