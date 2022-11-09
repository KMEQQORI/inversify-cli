const chalk = require('chalk')
const { getControllerPathConfiguration, getRootPathConfiguration, getServicePathConfiguration} = require("../config/configurationUtils")
const { addNewControllerToMappingMatrice , generatingControllerConfigurationFromMappingMatrice } = require("./utils/controllerUtils")
const scanf = require("scanf");
const printService = require("../service/printService");

async function newController() {
    const { controllerPath } = getControllerPathConfiguration();
    const { serviceInterfacePath } = getServicePathConfiguration();
    const { rootPath } = getRootPathConfiguration();


    console.log(
        chalk.yellowBright(`\n\nAdding the new controller binding`),
    )

    console.log(
        chalk.yellowBright(`\nController Interface Name ( CamelCase, example: AccountController ) :`),
    )
    const controllerName = scanf('%s');

    await printService();

    console.log(
        chalk.yellowBright(`\n Related Service Interface Name ( CamelCase, example: AccountService ) empty to skip:`),
    )
    let relatedServiceInterfaceName = scanf('%s')

    await addNewControllerToMappingMatrice(controllerPath,controllerName,relatedServiceInterfaceName);
    await generatingControllerConfigurationFromMappingMatrice(rootPath,controllerPath,serviceInterfacePath);
}

module.exports = newController;