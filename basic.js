const os = require('os');
const chance = require('chance');

const mychance = new chance();

console.log("hi");

console.log("it looks like you're running a " + os.platform() + " machine.");

console.log("your new fake name is " + mychance.name());
