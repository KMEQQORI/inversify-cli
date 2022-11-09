const chalk = require('chalk')
const { getServicePathConfiguration, getRootPathConfiguration} = require("../config/configurationUtils")
const { addNewServiceToMappingMatrice , generatingServiceConfigurationFromMappingMatrice } = require("./utils/serviceUtils")
const scanf = require("scanf");

async function newService() {
    const { serviceInterfacePath , serviceImplementationPath } = getServicePathConfiguration();
    const { rootPath } = getRootPathConfiguration();


    console.log(
        chalk.yellowBright(`\n\nAdding the new service binding`),
    )

    console.log(
        chalk.yellowBright(`\nService Interface Name ( CamelCase, example: AccountService ) :`),
    )
    const serviceInterfaceName = scanf('%s');

    console.log(
        chalk.yellowBright(`\nService Implementation Name ( CamelCase, example: AccountConcreteService ) :`),
    )
    const serviceImplementationName = scanf('%s');

    await addNewServiceToMappingMatrice(serviceInterfacePath,serviceInterfaceName,serviceImplementationName);
    await generatingServiceConfigurationFromMappingMatrice(rootPath,serviceInterfacePath,serviceImplementationPath);
}

module.exports = newService;