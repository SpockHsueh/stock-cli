const fs = require('fs')
const { getStockPrice } = require('../utils/fetchPrice.js')

exports.saveList = (stocks) => {
  const listName = stocks[0]
  stocks.splice(0, 1)
  const listObj = {
    lists: stocks
  }
  fs.writeFile(`${listName}.json`, JSON.stringify(listObj), function (err) {
    if (err) throw err
  })
  console.log('Saved!')
}

exports.readList = (fileName) => {
  const listName = fileName[1]
  if (!listName) {
    console.log('Input valid!')
    return
  }
  fs.readFile(`${listName}.json`, function (err, data) {
    if (err) {
      console.log('List name not found!')
      return
    }
    const stockList = JSON.parse(data).lists
    getStockPrice(stockList)
  })
}