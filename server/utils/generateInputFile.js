const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const folderForCodes = path.join(__dirname, "inputs");

// chk if folder exists or not, if not create it
if (!fs.existsSync(folderForCodes)) {
  fs.mkdirSync(folderForCodes, { recursive: true });
  // recursive: true ensures all directories in the path are created
}

// for storing input with .txt
const generateInputFile = (input) => {
  console.log("genrating file for input");
  let fileName;
    const fileId = uuid();
    const fileExtension = '.txt';

    fileName = `${fileId}.${fileExtension}`; //for input

  const filePath = path.join(folderForCodes, fileName);

  fs.writeFileSync(filePath, input);//inputs

  return filePath;//input file location
};


  

module.exports = { generateInputFile };
