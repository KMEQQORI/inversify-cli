const chalk = require("chalk");
const fs = require('fs');
const { parse } = require("csv-parse");
const { firstLetterToLowerCase } = require("../../../utils/utils");
const { generateServiceBindingFunction, generateServiceBindingType ,generateServiceInterfaceFile,generateServiceImplementationFile} = require("../ServiceFileGeneration");

const SERVICE_BINDING_FILE = "service.inversify.ts"
const SERVICE_TYPE_FILE = "service.type.ts"
const SERVICE_MAPPING_MATRICE = "serviceMappingMatrice.csv"


async function findServiceBindingFromInterfaceName(interfaceName){
    if(fs.existsSync(`${serviceInterfacePath}/${SERVICE_MAPPING_MATRICE}`)) {
        fs.createReadStream(`${serviceInterfacePath}/${SERVICE_MAPPING_MATRICE}`)
            .pipe(parse({delimiter: ",", from_line: 2}))
            .on("data", function (row) {
                if(row[0]===interfaceName.trim()){
                    return {
                        interfaceName:row[0],
                        implementationName:row[1]
                    }
                }
            })
            .on("end", function () {
                return undefined;
            })
            .on("error", function (error) {
                console.log(chalk.bold.redBright(error.message));
                return undefined;
            });
    }else{
        console.log(chalk.bold.redBright("\n\tMapping matrice file could not be found!\n"));
        return undefined;
    }
}

async function generatingServiceConfigurationFromMappingMatrice(rootPath,serviceInterfacePath,serviceImplementationPath){
    console.log(
        chalk.bgYellow('\n\treading service from the mapping matrice file ...\n')
    )
    const serviceMapping = [];
    if(fs.existsSync(`${serviceInterfacePath}/serviceMappingMatrice.csv`)) {
        fs.createReadStream(`${serviceInterfacePath}/serviceMappingMatrice.csv`)
            .pipe(parse({delimiter: ",", from_line: 2}))
            .on("data", function (row) {
                serviceMapping.push({
                    interfaceName: row[0],
                    implementationName: row[1],
                    interfaceFilePath: `${serviceInterfacePath}/${firstLetterToLowerCase(row[0])}`,
                    implementationFilePath: `${serviceImplementationPath}/${firstLetterToLowerCase(row[1])}`
                })

            })
            .on("end", function () {
                generateServiceBindingFunction(`${rootPath}/${SERVICE_BINDING_FILE}`, serviceMapping);
                generateServiceBindingType(`${rootPath}/${SERVICE_TYPE_FILE}`, serviceMapping);
                serviceMapping.forEach((service) => {
                    generateServiceInterfaceFile(service.interfaceFilePath, service.interfaceName);
                    generateServiceImplementationFile(service.implementationFilePath, service.interfaceName, service.implementationName);
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

async function addNewServiceToMappingMatrice(serviceInterfacePath,serviceInterfaceName,serviceImplementationName){
    await fs.appendFileSync(`${serviceInterfacePath}/serviceMappingMatrice.csv`, `\n${serviceInterfaceName},${serviceImplementationName}`);
}

module.exports = { generatingServiceConfigurationFromMappingMatrice , addNewServiceToMappingMatrice , findServiceBindingFromInterfaceName}