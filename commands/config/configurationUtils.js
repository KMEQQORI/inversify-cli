const chalk = require("chalk");
const scanf = require("scanf");
const conf = new (require('conf'))()


function getControllerPathConfiguration(){
    let controllerPath = conf.get('inversify-controller-path')

    if (!controllerPath) {
        console.log(
            chalk.yellow('Please add the path to your controller Folder :')
        );
        const newPath = scanf('%s');
        conf.set('inversify-controller-path', newPath)
        controllerPath = conf.get('inversify-controller-path')
    }

    console.log(
        chalk.green('\tcontroller directory:\t'),
        chalk.white(controllerPath)
    )

    return { controllerPath }
}

function getRootPathConfiguration(){
    let rootPath = conf.get('inversify-root-path')

    if (!rootPath) {
        console.log(
            chalk.yellow('Please add the path to your inversify root Folder :')
        );
        const newPath = scanf('%s');
        conf.set('inversify-root-path', newPath)
        rootPath = conf.get('inversify-root-path')
    }

    console.log(
        chalk.green('\tinversify root directory:\t'),
        chalk.white(rootPath)
    )

    return { rootPath }
}

function getRepositoryPathConfiguration(){
    let repositoryInterfacePath = conf.get('inversify-repository-interfaces-path')
    let repositoryImplementationPath = conf.get('inversify-repository-implementation-path')

    if (!repositoryInterfacePath) {
        console.log(
            chalk.yellow('Please add the path to your repository interfaces folder:')
        );
        const newPath = scanf('%s');
        conf.set('inversify-repository-interfaces-path', newPath)
        repositoryInterfacePath = conf.get('inversify-repository-interfaces-path')
    }

    console.log(
        chalk.green('\trepository intefaces directory:\t'),
        chalk.white(repositoryInterfacePath)
    )

    if (!repositoryImplementationPath) {
        console.log(
            chalk.yellow('Please add the path to your repository implementations folder:')
        );
        const newPath = scanf('%s');
        conf.set('inversify-repository-implementation-path', newPath)
        repositoryImplementationPath = conf.get('inversify-repository-implementation-path')
    }

    console.log(
        chalk.green('\trepository implementations directory:\t'),
        chalk.white(repositoryImplementationPath)
    )


    return { repositoryInterfacePath , repositoryImplementationPath }
}

function getServicePathConfiguration(){
    let serviceInterfacePath = conf.get('inversify-service-interfaces-path')
    let serviceImplementationPath = conf.get('inversify-service-implementation-path')

    if (!serviceInterfacePath) {
        console.log(
            chalk.yellow('Please add the path to your service interfaces folder:')
        );
        const newPath = scanf('%s');
        conf.set('inversify-service-interfaces-path', newPath)
        serviceInterfacePath = conf.get('inversify-service-interfaces-path')
    }

    console.log(
        chalk.green('\tservice intefaces directory:\t'),
        chalk.white(serviceInterfacePath)
    )

    if (!serviceImplementationPath) {
        console.log(
            chalk.yellow('Please add the path to your service implementations folder:')
        );
        const newPath = scanf('%s');
        conf.set('inversify-service-implementation-path', newPath)
        serviceImplementationPath = conf.get('inversify-service-implementation-path')
    }

    console.log(
        chalk.green('\tservice implementations directory:\t'),
        chalk.white(serviceImplementationPath)
    )


    return { serviceInterfacePath , serviceImplementationPath }
}


module.exports = { getRepositoryPathConfiguration , getServicePathConfiguration , getRootPathConfiguration , getControllerPathConfiguration}