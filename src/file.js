const { readFile } = require('fs/promises');
const { error } = require('./constants');
const User = require('./user');

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

    const users = this.parseCSVToJson(content);
    return users;
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

  static parseCSVToJson(csvString) {
    const lines = csvString.split('\n');

    //Remove the first item and add it to the variable
    const firstLine = lines.shift();
    const header = firstLine.split(',');
    const users = lines.map(line => {
      const columns = line.split(',');
      let user = {};
      for(const index in columns) {
        user[header[index]] = columns[index];
      }
      
      return new User(user);
    })
    return users;

  }
}

module.exports = File;