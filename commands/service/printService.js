const chalk = require('chalk')
const { getServicePathConfiguration } = require("../config/configurationUtils")
const {parse} = require("csv-parse");
const fs = require('fs');

async function printService() {
    const { serviceInterfacePath , serviceImplementationPath } = getServicePathConfiguration();

    console.log(chalk.bold.yellow("\n\n reading Service Mapping Matrice \n"));


    if(fs.existsSync(`${serviceInterfacePath}/serviceMappingMatrice.csv`)) {
        console.log(
            "\n\t\t",
            chalk.yellow.bold("Interface"),
            "\t===>",
            chalk.yellow.bold("Implementation"),
            );
        fs.createReadStream(`${serviceInterfacePath}/serviceMappingMatrice.csv`)
            .pipe(parse({delimiter: ",", from_line: 2}))
            .on("data", function (row) {
                console.log(
                    "\n\t\t",
                    chalk.yellow(row[0]),
                    "\t===>",
                    chalk.yellow(row[1]),
                );
            })
            .on("end", function () {
                console.log(chalk.bold.greenBright("\tMapping Matrice Health: OK!"));
                return Promise.resolve();
            })
            .on("error", function (error) {
                console.log(chalk.bold.redBright(error.message));
                return Promise.reject();
            });
    }else{
        console.log(chalk.bold.redBright("\n\tMapping matrice file could not be found!\n"));
    }
    await new Promise(r => setTimeout(r, 2000));

}

module.exports = printService;