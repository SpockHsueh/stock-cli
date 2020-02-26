const minimist = require('minimist')
const { help } = require('./help.js')
const { getStockPrice } = require('../utils/fetchPrice.js')
const { saveList, readList } = require('../utils/favorite.js')

exports.cli = async (argArray) => {
  const args = minimist(argArray.slice(2))
  const dataList = args._
  let cmd = args._[0] || 'help'

  switch (cmd) {

    case 'h':
    case 'help':
      help(args)
      break

    case 'p':
    case 'price':
      dataList.splice(0, 1)
      getStockPrice(dataList)
      break

    case 's':
    case 'save':
      dataList.splice(0, 1)
      saveList(dataList)
      break

    case 'l':
    case 'list':
      readList(dataList)
      break
    default:
      console.error(`"${cmd}" is not a valid command!`)
      break
  }

}