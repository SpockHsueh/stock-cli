const fetch = require('node-fetch')
const priceUrl = "https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch="
const ex_ch = {
  tse: "tse_",
  otc: "otc_"
}
const Table = require('cli-table3')
const chalk = require('chalk')
const loading = require('loading-cli')

exports.getStockPrice = async (stocks) => {

  if (!stocks) {
    console.log('Input valid!')
  }

  const load = loading("loading...").start()
  const queryStrings = getQueryStrings(mode = ex_ch.tse, stocks)
  const res = await fetch(`${priceUrl}${queryStrings}`)
    .then(res => res.json())
    .catch(err => {
      console.log(err)
      load.stop()
      return
    })

  if (res.rtcode == 9999 || res.msgArray.length == 0) {
    load.stop()
    console.log('Input valid or stock name wrong!')
    return
  }
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
  load.stop()
  console.log(table.toString())
}

const getQueryStrings = (mode, stocks) => {
  let queryString = ''
  stocks.forEach(item => {
    queryString += `${mode}${item}.tw|`
  })
  return queryString.substr(0, queryString.length - 1)
}

