const chalk = require('chalk')

const menus = {
  main: `
  
${chalk.greenBright('stock [command]')}

  ${chalk.greenBright('price stockName')} ................ show the price, ${chalk.yellowBright('ex: stock 2330')}
  ${chalk.greenBright('price stockName stockName')} ........... show the price, ${chalk.yellowBright('ex: stock 2330 1101')} 
  ${chalk.greenBright('save listName stockName')} ................ save the custom stock list, ${chalk.yellowBright('ex: stock save myFavorite 2330 1101')}
  ${chalk.greenBright('list listName')} ................ show the price from your list, ${chalk.yellowBright('ex: stock list myFavorite')}
  ${chalk.greenBright('help')} ............... show help menu for a command
`
}

exports.help = async (args) => {
  console.log('args._[0]', args._[0])
  const subCmd = args._[0] === 'help' ? args._[1] : args._[0]
  console.log(menus[subCmd] || menus.main)
}