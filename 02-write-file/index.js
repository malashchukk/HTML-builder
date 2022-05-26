const fs = require('fs');
const path = require('path');
const os = require('os');

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
let text = '';
const readline = require('readline');
const { stringify } = require('querystring');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ''
});
rl.prompt();
console.log('Введите текст:');
rl.on('line', (line) => {
  if (line === 'exit') rl.close();
  output.write(line + os.EOL);
  rl.prompt();
});
rl.on('close', () => {
  console.log('Удачи!');
  output.write(text);
  process.exit(0);
});

