const minimist = require('minimist')

exports.cli = async (argArray) => {
  const args = minimist(argArray.slice(2))
  console.log(args)
}