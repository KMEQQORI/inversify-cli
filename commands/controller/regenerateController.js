const chalk = require('chalk')
const { getControllerPathConfiguration, getRootPathConfiguration, getServicePathConfiguration} = require("../config/configurationUtils")
const { generatingControllerConfigurationFromMappingMatrice } = require("./utils/controllerUtils")
const scanf = require("scanf");

async function regenerateController() {
    console.log(
        chalk.yellowBright(`\n\nGenerating service binding\n`),
    )

    const { controllerPath } = getControllerPathConfiguration();
    const { rootPath } = getRootPathConfiguration();
    const { serviceInterfacePath } = getServicePathConfiguration();

    await generatingControllerConfigurationFromMappingMatrice( rootPath , controllerPath , serviceInterfacePath );
}

module.exports = regenerateController;