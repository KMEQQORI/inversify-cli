const chalk = require('chalk')
const { getRepositoryPathConfiguration , getServicePathConfiguration , getRootPathConfiguration,
    getControllerPathConfiguration
} = require("./configurationUtils")

function printConfiguration() {
    console.log(
        chalk.bold.yellowBright(`\n\n Current Paths configuration : `),
    )
    const { rootPath } = getRootPathConfiguration();
    const { repositoryInterfacePath , repositoryImplementationPath } = getRepositoryPathConfiguration();
    const { serviceInterfacePath , serviceImplementationPath } = getServicePathConfiguration();
    const { controllerPath } = getControllerPathConfiguration();
}

module.exports = printConfiguration;