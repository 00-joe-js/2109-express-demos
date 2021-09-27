const chalk = require("chalk");
// Where my node program begins.
// node hello.js

console.log(chalk.blue("Beginning program in hello.js!"));

const value = require("./secondfile");
console.log(value);
console.log(value.squareFn);
console.log(value.piFn);

// console.log(valueGivenToMeFromSecondFile);
// console.log(typeof valueGivenToMeFromSecondFile);

