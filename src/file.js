const { readFile } = require('fs/promises');
const { error } = require('./constants');

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age']
};

class File {
  static async csvToJson(filePath) {
    const content = await this.getFileContent(filePath);

    const validation = this.isValid(content);

    if (!validation.valid) {
      throw new Error(validation.error);
    }

    return content;
  }

  static async getFileContent(filePath) {
    //Convert file content to brazilian format
    return (await readFile(filePath)).toString('utf8');
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeader] = csvString.split('\n');
    const headerPattern = options.fields.join(',');
    const isHeaderValid = header === headerPattern;
    if(!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      };
    }

    const isContentLengthAccepted = (
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines 
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

module.exports = File;