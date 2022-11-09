const chalk = require('chalk')
const { getRepositoryPathConfiguration } = require("../config/configurationUtils")
const {parse} = require("csv-parse");
const fs = require('fs');

async function printRepository() {
    const { repositoryInterfacePath , repositoryImplementationPath } = getRepositoryPathConfiguration();

    console.log(chalk.bold.yellow("\n\n reading Repository Mapping Matrice \n"));


    if(fs.existsSync(`${repositoryInterfacePath}/repositoryMappingMatrice.csv`)) {
        console.log(
            "\n\t\t",
            chalk.yellow.bold("Interface"),
            "\t===>",
            chalk.yellow.bold("Implementation"),
            );
        fs.createReadStream(`${repositoryInterfacePath}/repositoryMappingMatrice.csv`)
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
            })
            .on("error", function (error) {
                console.log(chalk.bold.redBright(error.message));
            });
    }else{
        console.log(chalk.bold.redBright("\n\tMapping matrice file could not be found!\n"));
    }
}

module.exports = printRepository;