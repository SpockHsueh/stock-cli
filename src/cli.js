const minimist = require('minimist')
const { help } = require('./help.js')
const { getStockPrice } = require('./utils.js')
const ex_ch = {
  tse: "tse_",
  otc: "otc_"
}
exports.cli = async (argArray) => {
  const args = minimist(argArray.slice(2))
  console.log(args._[0])
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
      const res = await getStockPrice(ex_ch.tse, 2330)
      console.log('the price is:', res)
      break
    default:
      console.error(`"${cmd}" is not a valid command!`)
      break
  }

}