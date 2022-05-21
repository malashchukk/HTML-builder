const fs = require('fs');
const { Transform } = require('stream');
const path = require('path')
const rs = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

rs.on('data', chunk => console.log(chunk));


  // fs.readFile(
  //   path.join('01-read-file','text.txt'),
  //   'utf-8',
  //   (err, data) => {
  //     if (err) throw err;
  //     console.log(data);
  // }
  // );
// console.log(readFile);
