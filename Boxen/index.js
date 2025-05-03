const boxen = require('boxen');


const roundedBox = boxen('unicorns love rainbows', {
  title: 'Hurray!!!',
  padding: 1,
  margin: 1,
  borderStyle: 'round'
});


const multilineMessage = `
  I am using my first external module!
`;

const singleDoubleBox = boxen(multilineMessage, {
  title: 'Hurray!!!',
  padding: 1,
  margin: 1,
  borderStyle: 'singleDouble'
});


console.log(roundedBox);
console.log(singleDoubleBox);


