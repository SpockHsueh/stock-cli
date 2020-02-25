const fetch = require('node-fetch')
const priceUrl = "https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch="
const ex_ch = {
  tse: "tse_",
  otc: "otc_"
}
const Table = require('cli-table3')
const chalk = require('chalk')

exports.getStockPrice = async (mode, stocks, date) => {
  const stockPriceList = []
  if (!mode && !stockList) {
    console.log('Input valid!')
  }

  const queryString = getQueryString(mode = ex_ch.tse, stocks)
  const res = await fetch(`${priceUrl}${queryString}`)
    .then(res => res.json())
    .catch(err => {
      throw err
    })

  '★'
  const table = new Table({
    head: ['名字', '昨收', '開', '高', '低', '量', '漲跌', '更新時間'],
    colWidths: [15, 10, 10, 10, 10, 10, 10, 10],
    wordWrap: true
  })
  res.msgArray.forEach(item => {
    let hAndL = item.z - item.y
    const priceStatus = hAndL > 0 ? chalk.redBright('▲') : chalk.greenBright('▼')
    hAndL = hAndL > 0 ? chalk.redBright(hAndL.toFixed(2)) : chalk.greenBright(hAndL.toFixed(2))
    table.push([
      item.n,
      item.y,
      item.o,
      item.h,
      item.l,
      item.v,
      `${priceStatus} ${hAndL}`,
      item.t
    ])
  })
  console.log(table.toString())
}

const getQueryString = (mode, stock) => {
  return `${mode}${stock}.tw`
}

const getQueryStrings = (mode, stocks, date) => {
  let queryString = ''
  stocks.forEach(item => {
    queryString += `${mode}${stock}.tw_${date}|`
  })
  return queryStr.substr(0, queryStr.length - 1)
}

