const fs = require('fs');
const path = require('path'); 

let folder = fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if (err) throw err;
  for (let i of files){
    let pathOfFile = path.join(__dirname, 'secret-folder', `${i}`);
    fs.stat(pathOfFile, (err, stats) => {
      if (!stats.isDirectory()){
        let file = i.split('.');
        console.log(`${file[0]} - ${file[1]} - ${stats.size}b`)
      }
    });
  }
});

