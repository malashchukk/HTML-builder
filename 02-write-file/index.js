const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
// const input = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
// input.pipe(output);

let text = '';
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ''
});

rl.prompt();
console.log('Введите текст:');
rl.on('line', (line) => {

  if (line === 'exit') rl.close();

  text += line;
  

  rl.prompt();
});
rl.on('close', () => {
  console.log('Удачи!');
  output.write(text);
  process.exit(0);
});

