const fs = require('fs');
const { Transform } = require('stream');
const path = require('path')
const rs = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

rs.on('data', chunk => console.log(chunk));

