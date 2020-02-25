const minimist = require('minimist')
const { help } = require('./help.js')
const { getStockPrice } = require('../utils/fetchPrice.js')
const ex_ch = {
  tse: "tse_",
  otc: "otc_"
}
exports.cli = async (argArray) => {
  const args = minimist(argArray.slice(2))
  const stockList = args._
  let cmd = args._[0] || 'help'

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {

    case 'help':
      help(args)
      break
    case 'price':
      await getStockPrice(stockList)
      break
    default:
      console.error(`"${cmd}" is not a valid command!`)
      break
  }

}