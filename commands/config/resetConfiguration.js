const chalk = require('chalk')
const { printConfiguration } = require("./configurationUtils")
const scanf = require("scanf");
const conf = new (require('conf'))()

function resetConfiguration() {
    printConfiguration();
    console.log(
        chalk.bold.redBright(`Are you sur you want to reset all Paths configuration : ( y / n ) `),
    )
    const confirm = scanf('%s');

    if(confirm.toLowerCase()==="y"){
        console.log(
            chalk.bold.redBright('deleting all your paths configuration ...'),
        );
        conf.clear();
    }else{
        console.log(
            chalk.bold.yellowBright('aborting ...'),
        );
    }
}

module.exports = resetConfiguration;