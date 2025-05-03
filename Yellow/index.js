
const chalk = require('chalk');


console.log(chalk.blue('Hello, World!'));
console.log(chalk.yellow('Learning Chalk is fun!'));


console.log(chalk.bgYellow.black('Warning! Proceed with caution.'));
console.log(chalk.bgRed.white('Error! Something went wrong.'));


console.log(chalk.green('Success:') + chalk.white(' Operation completed!'));
console.log(chalk.cyan('Loading...') + chalk.magenta(' Please wait'));


const error = chalk.bold.red;
const warning = chalk.bold.hex('#FFA500'); 
const success = chalk.bold.green;


console.log(error('Error: Unable to connect to the server!'));
console.log(warning('Warning: Low disk space!'));
console.log(success('Success: Data saved successfully!'));


console.log(chalk.underline.rgb(255, 255, 0)('This is underlined in yellow using RGB!'));
console.log(chalk.italic.hex('#00FFFF')('This is italic cyan using HEX!'));
console.log(chalk.strikethrough.red('This is strikethrough red text.'));
