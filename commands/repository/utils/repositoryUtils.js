const chalk = require("chalk");
const fs = require('fs');
const { parse } = require("csv-parse");
const { firstLetterToLowerCase } = require("../../../utils/utils");
const { generateRepositoryBindingFunction, generateRepositoryBindingType ,generateRepositoryInterfaceFile,generateRepositoryImplementationFile} = require("../repositoryFileGeneration");

const REPOSITORY_BINDING_FILE = "respository.inversify.ts"
const REPOSITORY_TYPE_FILE = "respository.type.ts"

async function generatingRepositoryConfigurationFromMappingMatrice(rootPath,repositoryInterfacePath, repositoryImplementationPath){
    console.log(
        chalk.bgYellow('\n\treading repository from the mapping matrice file ...\n')
    )
    const repositoryMapping = [];
    if(fs.existsSync(`${repositoryInterfacePath}/repositoryMappingMatrice.csv`)) {
        fs.createReadStream(`${repositoryInterfacePath}/repositoryMappingMatrice.csv`)
            .pipe(parse({delimiter: ",", from_line: 2}))
            .on("data", function (row) {
                repositoryMapping.push({
                    interfaceName: row[0],
                    implementationName: row[1],
                    interfaceFilePath: `${repositoryInterfacePath}/${firstLetterToLowerCase(row[0])}`,
                    implementationFilePath: `${repositoryImplementationPath}/${firstLetterToLowerCase(row[1])}`
                })

            })
            .on("end", function () {
                generateRepositoryBindingFunction(`${rootPath}/${REPOSITORY_BINDING_FILE}`, repositoryMapping);
                generateRepositoryBindingType(`${rootPath}/${REPOSITORY_TYPE_FILE}`, repositoryMapping);
                repositoryMapping.forEach((repository) => {
                    generateRepositoryInterfaceFile(repository.interfaceFilePath, repository.interfaceName);
                    generateRepositoryImplementationFile(repository.implementationFilePath, repository.interfaceName, repository.implementationName);
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

async function addNewRepositoryToMappingMatrice(repositoryInterfacePath,repositoryInterfaceName,repositoryImplementationName){
    await fs.appendFileSync(`${repositoryInterfacePath}/repositoryMappingMatrice.csv`, `\n${repositoryInterfaceName},${repositoryImplementationName}`);
}

module.exports = { generatingRepositoryConfigurationFromMappingMatrice , addNewRepositoryToMappingMatrice }