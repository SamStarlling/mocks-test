const { readFile } = require('fs/promises');
const { join } = require('path');

const { error } = require('./constants');
console.log(error);

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: [ 'id', 'name', 'profession', 'age' ]
};

class File {
  static async csvJson(filePath) {
    const content = await this.getFileContent(filePath);

    const validation = await this.isValid(content);
    console.log(validation)

    if (!validation.valid) {
      throw new Error(validation.error);
    }

    return content;
  }

  static async getFileContent(filePath) {
    //Get file path
    const fileName = join(__dirname, filePath);

    //Convert file content to brazilian format
    return ( await readFile(fileName)).toString('utf8');
  }

  static async isValid(csvString, options = DEFAULT_OPTIONS) {
    const headerPattern = options.fields.join(',');
    const [header, ...fileWithoutHeader] = csvString.split('\n');
    
    const isHeaderValid = header === headerPattern;
    if(!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      };
    }

    const isContentLengthAccepted = (
      fileWithoutHeader.lenght > 0 &&
      fileWithoutHeader.lenght <= options.maxLines 
    );
    if(!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      };
    }
    return {
      valid: true
    };
  }
}

//clojure (auto excute function - IFE) - call file methods
(async () => {
  // const result = await File.csvJson('./../mocks/empty-file-invalid.csv');
  // const result = await File.csvJson('./../mocks/invalid-header.csv');
  // const result = await File.csvJson('./../mocks/three-items-invalid.csv');
  const result = await File.csvJson('./../mocks/four-items-invalid.csv');
  console.log('result', result);
})();