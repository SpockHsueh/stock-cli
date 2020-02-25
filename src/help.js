const chalk = require('chalk')

const menus = {
  main: `
  
${chalk.greenBright('stock [command]')}

  ${chalk.greenBright('price stock name')} ................ show the price, ${chalk.yellowBright('ex: stock 2330')}
  ${chalk.greenBright('price stock name stock name')} ........... show the price, ${chalk.yellowBright('ex: stock 2330 1101')} 
  ${chalk.greenBright('help')} ............... show help menu for a command
`
}

exports.help = async (args) => {
  console.log('args._[0]', args._[0])
  const subCmd = args._[0] === 'help' ? args._[1] : args._[0]
  console.log(menus[subCmd] || menus.main)
}