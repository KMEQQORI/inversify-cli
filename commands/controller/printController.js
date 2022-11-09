const chalk = require('chalk')
const { getControllerPathConfiguration } = require("../config/configurationUtils")
const {parse} = require("csv-parse");
const fs = require('fs');
const { CONTROLLER_MAPPING_MATRICE } = require("./utils/controllerUtils");

async function printController() {
    const { controllerPath } = getControllerPathConfiguration();
    const mappingMatricePath = `${controllerPath}/${CONTROLLER_MAPPING_MATRICE}`;

    console.log(chalk.bold.yellow("\n\n reading controller liste \n"));


    if(fs.existsSync(mappingMatricePath)) {
        console.log(
            "\n\t\t",
            chalk.yellow.bold("controller"),
            "\t===>",
            chalk.yellow.bold("related service"),
            );
        fs.createReadStream(mappingMatricePath)
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

module.exports = printController;