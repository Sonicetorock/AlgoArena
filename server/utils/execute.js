const fs = require('fs');
const path = require('path');

//utilities
const { exec } = require('child_process');
const { deleteFile } =require('./generateFile');



const folderForOutputs = path.join(__dirname, 'outputs');
const folderForCodes = path.join(__dirname, "codes");
// Chk if folder exists or not, if not create it
if (!fs.existsSync(folderForOutputs)) {
  fs.mkdirSync(folderForOutputs, { recursive: true });
}

const execute = (codeFilePath, language, inputFilePath) => {
  const outputFileNameWOextension = path.basename(codeFilePath).split('.')[0];
  const outputPath = path.join(folderForOutputs, outputFileNameWOextension); // location of .exe or output file

  //commands for windows
  // const commands = {
  //   cpp: `g++ "${codeFilePath}" -o "${outputPath}" && "${outputPath}.exe" < "${inputFilePath}"`,
  //   c: `gcc "${codeFilePath}" -o "${outputPath}" && "${outputPath}.exe" < "${inputFilePath}"`,
  //   py: `python "${codeFilePath}" < "${inputFilePath}"`,
  //   java: `javac "${codeFilePath}" && java -cp "${path.dirname(codeFilePath)}" ${outputFileNameWOextension} < "${inputFilePath}"`
  // };

  const commands = {
    cpp: `g++ "${codeFilePath}" -o "${outputPath}" && "${outputPath}" < "${inputFilePath}"`,
    c: `gcc "${codeFilePath}" -o "${outputPath}" && "${outputPath}" < "${inputFilePath}"`,
    py: `python "${codeFilePath}" < "${inputFilePath}"`,
    java: `javac "${codeFilePath}" && java -cp "${path.dirname(codeFilePath)}" ${outputFileNameWOextension} < "${inputFilePath}"`
};


  //specified lang command
  const command = commands[language];

  if (!command) {
    return Promise.reject(new Error(`Unsupported language: ${language}`));
  }

//   console.log(command);

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        const errorMessage = parseError(stderr || error.message);
        reject(new Error(errorMessage));
      }
      if (stderr) {
        console.log(error);
        const errorMessage = parseError(stderr);
        reject(new Error(errorMessage));
      }

      // Delete the created output file
      if (language === 'cpp' || language === 'c') {
        deleteFile(`${outputPath}.out`); 
        //creating exe in outputs folder for windows, out for linux
        console.log("exe / out file deleted for c || cpp")
      }
      if (language === 'java') {
        //creating class folder inside codes folder
        deleteFile(folderForCodes+`\\${outputFileNameWOextension}.class`);
        console.log("class file deleted for java")
      }
      
      resolve(stdout);
    });
  });

};

//formatting the output - removing the uncessary info
const parseError = (errorOutput) => {
    const errorLines = errorOutput.split('\n');
    const relevantLines = [];
    
    for (const line of errorLines) {
      const codesIndex = line.indexOf('codes');
      if (codesIndex !== -1) {
        relevantLines.push(line.substring(codesIndex + 'codes'.length + 1)); // Remove content before and including "codes"
      }
      else relevantLines.push(line);
    }
  
    return relevantLines.join('\n').trim();
  };
  
  module.exports = { execute };

  




  // const parseError = (errorOutput) => {
  //     const errorLines = errorOutput.split('\n');
  //     const relevantLines = [];
    
  //     for (const line of errorLines) {
  //       const codesIndex = line.indexOf('codes');
  //       if (codesIndex !== -1) {
  //         relevantLines.push(line.substring(codesIndex + 'codes\\'.length));
  //       }
  //     }
    
  //     return relevantLines.join('\n').trim();
  //   };
  // const parseError = (errorOutput) => {
  //     const codesIndex = errorOutput.indexOf('codes');
  //     if (codesIndex !== -1) {
  //       return errorOutput.substring(codesIndex + 'codes'.length + 1).trim();
  //     }
  //     return errorOutput.trim();
  //   };
  // const parseError = (errorOutput) => {
  //     const codesIndex = errorOutput.indexOf('codes');
  //     if (codesIndex !== -1) {
  //       const relevantOutput = errorOutput.substring(codesIndex + 'codes'.length + 1).trim();
  //       const errorLines = relevantOutput.split('\n').filter(line => line.includes('error'));
  //       return errorLines.join('\n').trim();
  //     }
  //     return errorOutput.trim();
  //   };  