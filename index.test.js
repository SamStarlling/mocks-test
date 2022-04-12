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
        id: 123,
        name: 'Erick Wendel',
        profession: 'Javascript Instructor',
        age: 25
      },
      {
        id: 321,
        name: 'Xuxa da Silva',
        profession: 'Javascript Specialist',
        age: 80
      },
      {
        id: 231,
        name: 'Joaozinho',
        profession: 'Java Developer',
        age: 30
      }
    ];
    //Verify value and reference
    deepStrictEqual(result, expected);
  }

})();
