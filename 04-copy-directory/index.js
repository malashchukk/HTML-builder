const fs = require('fs');
const path = require('path');

(async () => {

  if ((await fs.promises.readdir(path.join(__dirname))).includes('files-copy')){
    await fs.promises.rm(path.join(__dirname, "files-copy"), { recursive: true}); 
  }
  await fs.promises.mkdir(path.join(__dirname, "files-copy"), { recursive: false});
  let filesFromOld = await fs.promises.readdir(path.join(__dirname, 'files'))
  for (let file of filesFromOld){
    await fs.promises.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file));
  }
  console.log('Done!');
  
})();
