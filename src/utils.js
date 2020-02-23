const fetch = require('node-fetch')
const cheerio = require('cheerio')
const priceUrl = "https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch="
const ex_ch = {
  tse: "tse_",
  otc: "otc_"
}

exports.getStockPrice = async (mode, stocks, date) => {
  const stockPriceList = []
  if (!mode && !stockList) {
    console.log('Input valid!')
  }

  try {
    console.log('stocks', stocks)
    const queryString = getQueryString(mode = ex_ch.tse, stocks)
    const res = await fetch(`${priceUrl}${queryString}`)
      .then(res => res.json())
      .catch(err => {
        throw err
      })
    console.log('@res', res)
    res.msgArray.forEach(item => {
      stockPriceList.push(item)
    })
    return stockPriceList
  } catch (err) {
    console.log(err)
  }
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

