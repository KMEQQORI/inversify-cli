const chalk = require('chalk')
const { getRepositoryPathConfiguration , getRootPathConfiguration } = require("../config/configurationUtils")
const { addNewRepositoryToMappingMatrice , generatingRepositoryConfigurationFromMappingMatrice } = require("./utils/repositoryUtils")
const scanf = require("scanf");

async function newRepository() {
    const { repositoryInterfacePath , repositoryImplementationPath } = getRepositoryPathConfiguration();
    const { rootPath } = getRootPathConfiguration();

    console.log(
        chalk.yellowBright(`\n\nAdding the new repository binding`),
    )

    console.log(
        chalk.yellowBright(`\nRepository Interface Name ( CamelCase, example: AccountRepository ) :`),
    )
    const repositoryInterfaceName = scanf('%s');

    console.log(
        chalk.yellowBright(`\nRepository Implementation Name ( CamelCase, example: AccountSequelizeRepository ) :`),
    )
    const repositoryImplementationName = scanf('%s');

    await addNewRepositoryToMappingMatrice(repositoryInterfacePath,repositoryInterfaceName,repositoryImplementationName);
    await generatingRepositoryConfigurationFromMappingMatrice(rootPath,repositoryInterfacePath,repositoryImplementationPath);
}

module.exports = newRepository;