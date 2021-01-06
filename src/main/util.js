const chalk = require('chalk');

const log = (color, text) => console.log(chalk[color](text));

module.exports = { log };
