const chalk = require("chalk");
const fs = require('fs');
const { parse } = require("csv-parse");
const { firstLetterToLowerCase } = require("../../../utils/utils");
const { generateControllerBindingFunction , generateControllerFile } = require("../ControllerFileGeneration");

const CONTROLLER_BINDING_FILE = "controller.inversify.ts"
const CONTROLLER_MAPPING_MATRICE = "controllerMappingMatrice.csv"

async function generatingControllerConfigurationFromMappingMatrice(rootPath,controllerPath,serviceInterfacePath){
    const mappingMatricePath = `${controllerPath}/${CONTROLLER_MAPPING_MATRICE}`;
    console.log(
        chalk.bgYellow('\n\treading controller from the mapping matrice file ...\n')
    )
    const controllerMapping = [];
    if(fs.existsSync(mappingMatricePath)){
        fs.createReadStream(mappingMatricePath)
            .pipe(parse({delimiter: ",", from_line: 2}))
            .on("data", function (row) {
                controllerMapping.push({
                    controllerName: row[0],
                    relatedServiceInterfaceName: row[1],
                    controllerFilePath: `${controllerPath}/${firstLetterToLowerCase(row[0])}`,
                    relatedServiceInterfacePath: `${serviceInterfacePath}/${firstLetterToLowerCase(row[1])}`,
                })
            })
            .on("end", function () {
                generateControllerBindingFunction(`${rootPath}/${CONTROLLER_BINDING_FILE}`, controllerMapping);
                controllerMapping.forEach((controller) => {
                    generateControllerFile(controller.controllerFilePath,controller.controllerName,controller.relatedServiceInterfaceName,controller.relatedServiceInterfacePath);
                })

                console.log(chalk.bold.greenBright("\tAll Files successfully generated !"));
            })
            .on("error", function (error) {
                console.log(chalk.bold.redBright(error.message));
            });
    }else{
        console.log(chalk.bold.redBright("\n\tMapping matrice file could not be found!\n"));
    }
}

async function addNewControllerToMappingMatrice(controllerPath , controllerName , relatedServiceName){
    await fs.appendFileSync(`${controllerPath}/${CONTROLLER_MAPPING_MATRICE}`, `\n${controllerName},${relatedServiceName}`);
}

module.exports = { generatingControllerConfigurationFromMappingMatrice , addNewControllerToMappingMatrice , CONTROLLER_BINDING_FILE , CONTROLLER_MAPPING_MATRICE }