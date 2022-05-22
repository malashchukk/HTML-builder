const fs = require('fs');
const path = require('path');

async function createFolder() {
  if ((await fs.promises.readdir(path.join(__dirname))).includes('project-dist')){
    await fs.promises.rm(path.join(__dirname, "project-dist"), { recursive: true}); 
  }
  await fs.promises.mkdir(path.join(__dirname, "project-dist"), { recursive: true});
}
async function createHtml(){
  let template = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  let keyWords = [];
  let q = template.split('{{');

  for (let i of q){
    i = i.split('}}');
    keyWords.push(i[0]);
  }

  keyWords = keyWords.slice(1);
  let doneHtml = template;

  for (let key of keyWords){
    let file = await fs.promises.readFile(path.join(__dirname, 'components', `${key}.html`), 'utf-8');
    doneHtml = doneHtml.replace(`{{${key}}}`, file);
  }
  
  await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), doneHtml);
}
async function createCss(){
  let allContent = [];
  let files = await fs.promises.readdir(path.join(__dirname, 'styles'));

  for (let file of files){
    let fileName = file.split('.')
    let type = fileName[1];
    let stat = await fs.promises.stat(path.join(__dirname, 'styles', file));
    if (type === 'css' && !stat.isDirectory()){
      let content = await fs.promises.readFile(path.join(__dirname, 'styles', file), 'utf-8');
      allContent.push(content + '\n');
    //  console.log(content);
    }
  }

  await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'style.css'), allContent);
}
async function createAssetsFolder(){
  if ((await fs.promises.readdir(path.join(__dirname, 'project-dist'))).includes('assets')){
    await fs.promises.rm(path.join(__dirname, 'project-dist',"assets"), { recursive: true}); 
  }

  await fs.promises.mkdir(path.join(__dirname, "project-dist", "assets"), { recursive: true});

  let foldersFromOld = await fs.promises.readdir(path.join(__dirname, 'assets'));

  for (let folderName of foldersFromOld){
    await fs.promises.mkdir(path.join(__dirname, "project-dist", "assets", folderName), { recursive: true});
    let files = await fs.promises.readdir(path.join(__dirname, 'assets', folderName));

    for (let file of files){
      await fs.promises.copyFile(path.join(__dirname, 'assets', folderName, file), path.join(__dirname, 'project-dist', 'assets', folderName, file));
    }

  }
}

(async () => {
  await createFolder();
  // console.log('Folder done!');
  await createHtml();
  // console.log('HTML done!');
  await createCss();
  // console.log('CSS done!');
  await createAssetsFolder();
  // console.log('Assets done!');
  console.log('Page done!');
})();