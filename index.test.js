const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

//clojure (auto excute function - IFE) - call file methods
(async () => {
  //Test when the file is empty
  {
    const filePath = './mocks/empty-file-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  
  //Test when the file has invalid length
  {
    const filePath = './mocks/four-items-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  
  //Test when the file is valid
  {
    const filePath = './mocks/three-items-valid.csv';
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        name: 'Erick Wendel',
        id: 123,
        profession: 'Javascript Instructor',
        birthday: new Date().getFullYear() - 25
      },
      {
        name: 'Xuxa da Silva',
        id: 321,
        profession: 'Javascript Specialist',
        birthday: new Date().getFullYear() - 80
      },
      {
        name: 'Joaozinho',
        id: 231,
        profession: 'Java Developer',
        birthday: new Date().getFullYear() - 30
      }
    ];
    //Verify value and reference
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }

})();
