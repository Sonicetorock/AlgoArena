const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const folderForCodes = path.join(__dirname, "codes");

// chk if folder exists or not, if not create it
if (!fs.existsSync(folderForCodes)) {
  fs.mkdirSync(folderForCodes, { recursive: true });
  // recursive: true ensures all directories in the path are created
}

//specifically for storing code with the specified lang extension and store it in codes
const generateFile = (code, language) => {
  console.log("genrating file for code");
  let fileName;
  //seperate handling for java as it gives .class file
  if (language === "java") {
    //matching with regular expression, seeing whther has public class then the first word next will be our className
    const match = code.match(/public\s+class\s+(\w+)/);
    if (!match) {
      throw new Error("Public class name not found in Java code");
    }
    const className = match[1];
    fileName = `${className}.java`;
  } else {
    const fileId = uuid();
    const fileExtension = language; 
    fileName = `${fileId}.${fileExtension}`;
  }
  const filePath = path.join(folderForCodes, fileName);

  fs.writeFileSync(filePath, code);

  return filePath;
};


//deleting the file using fs.unlink
const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Failed to delete file ${filePath}:`, err);
      else console.log(`Deleted file ${filePath}`);
    });
  };
  

module.exports = { generateFile,deleteFile };
