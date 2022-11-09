const chalk = require('chalk')
const { getRepositoryPathConfiguration, getRootPathConfiguration} = require("../config/configurationUtils")
const { generatingRepositoryConfigurationFromMappingMatrice } = require("./utils/repositoryUtils")

async function regenerateRepository() {
    console.log(
        chalk.yellowBright(`\n\nGenerating repository binding\n`),
    )
    const { rootPath } = getRootPathConfiguration();
    const { repositoryInterfacePath , repositoryImplementationPath } = getRepositoryPathConfiguration();

    await generatingRepositoryConfigurationFromMappingMatrice(rootPath,repositoryInterfacePath,repositoryImplementationPath);
}

module.exports = regenerateRepository;