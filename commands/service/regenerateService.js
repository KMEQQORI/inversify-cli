const chalk = require('chalk')
const { getServicePathConfiguration, getRootPathConfiguration} = require("../config/configurationUtils")
const { generatingServiceConfigurationFromMappingMatrice } = require("./utils/serviceUtils")
const scanf = require("scanf");

async function regenerateService() {
    console.log(
        chalk.yellowBright(`\n\nGenerating service binding\n`),
    )

    const { serviceInterfacePath , serviceImplementationPath } = getServicePathConfiguration();
    const { rootPath } = getRootPathConfiguration();

    await generatingServiceConfigurationFromMappingMatrice(rootPath,serviceInterfacePath,serviceImplementationPath);
}

module.exports = regenerateService;