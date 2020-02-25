const fetch = require('node-fetch')
const priceUrl = "https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch="
const ex_ch = {
  tse: "tse_",
  otc: "otc_"
}
const Table = require('cli-table3')

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

  const table = new Table({
    head: ['名字', '開', '高', '低', '量', '漲跌', '更新時間'],
    colWidths: [15, 8, 8, 8, 8, 8],
    wordWrap: true
  })
  res.msgArray.forEach(item => {
    const hAndL = `${item.z - item.y}%`
    table.push([
      item.n,
      item.o,
      item.h,
      item.l,
      item.v,
      hAndL,
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

