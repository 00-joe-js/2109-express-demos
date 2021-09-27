// module.exports = {}
// const exports = module.exports;

console.log("secondfile.js executed!");
const pi = require("./thirdfile");

const square = n => {
    return n * n;
};

module.exports = {
    squareFn: square,
    piFn: pi
}