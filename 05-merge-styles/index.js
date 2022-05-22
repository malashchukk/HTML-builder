const fs = require('fs');
const path = require('path');

(async () => {
  let allContent = [];

  let files = await fs.promises.readdir(path.join(__dirname, 'styles'));

  for (let file of files){
    let fileName = file.split('.')
    let type = fileName[1];
    let stat = await fs.promises.stat(path.join(__dirname, 'styles', file));
    if (type === 'css' && !stat.isDirectory()){
      let content = await fs.promises.readFile(path.join(__dirname, 'styles', file), 'utf-8');
      allContent.push(content + '\n');
    }
  }

  await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), allContent);

})();
