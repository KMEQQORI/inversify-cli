const ejs = require("ejs");
const chalk = require("chalk");
const fs = require('fs');
const repositoryBindingTemplateFile = require("./fileTemplate/repository-binding-function-template")
const repositoryBindingTypeTemplateFile = require("./fileTemplate/repository-binding-type-template")
const repositoryInterfaceTemplateFile = require("./fileTemplate/repository-interface-template")
const repositoryImplementationTemplateFile = require("./fileTemplate/repository-Implementation-template")
const { printAFile } = require("../../utils/utils")


async function generateRepositoryInterfaceFile(repositoryInterfaceFilePath,interfaceName) {
    console.log(chalk.yellow(`\t\tgenerating interface ${interfaceName}.ts ...`));

    if(!fs.existsSync(repositoryInterfaceFilePath)){
        const repositoryInterfaceGeneratedFile = await ejs.render(repositoryInterfaceTemplateFile, {
            interfaceName
        });
        printAFile(repositoryInterfaceGeneratedFile,`${interfaceName}.ts`);
        fs.writeFile(`${repositoryInterfaceFilePath}.ts`, repositoryInterfaceGeneratedFile, function (err) {
            if (err) throw err;
        });
        console.log(chalk.green('\t\tfile created : ',`${interfaceName}.ts`));
    }else{
        console.log(chalk.yellowBright('\t\tfile already exist : ',`${interfaceName}.ts`));
    }
}

async function generateRepositoryImplementationFile(repositoryImplementationFilePath,interfaceName,implementationName) {
    console.log(chalk.yellow(`\t\tgenerating implementation ${implementationName}.ts`));
    if(!fs.existsSync(repositoryImplementationFilePath)) {
        const repositoryImplementationGeneratedFile = await ejs.render(repositoryImplementationTemplateFile, {
            interfaceName,
            implementationName
        });
        printAFile(repositoryImplementationGeneratedFile,`${implementationName}.ts`);
        fs.writeFile(`${repositoryImplementationFilePath}.ts`, repositoryImplementationGeneratedFile, function (err) {
            if (err) throw err;
        });
        console.log(chalk.green('\t\tfile created : ', `${implementationName}.ts`));
    }else{
        console.log(chalk.yellowBright('\t\tfile already exist : ',`${implementationName}.ts`));
    }
}

async function generateRepositoryBindingFunction(repositoryBindingFunctionFilePath,repositoryList) {
    console.log(chalk.yellow(`\t\tgenerating Repository Binding function file ...`));
    const repositoryBindingFunctionGeneratedFile = await ejs.render(repositoryBindingTemplateFile, {
        repositoryList
    });
    printAFile(repositoryBindingFunctionGeneratedFile,`repository binding File`);
    fs.writeFile(repositoryBindingFunctionFilePath, repositoryBindingFunctionGeneratedFile, function (err) {
        if (err) throw err;
    });
    console.log(chalk.green('\t\tnew file regenerated : ',repositoryBindingFunctionFilePath));
}

async function generateRepositoryBindingType(repositoryBindingTypeFilePath,repositoryList) {
    console.log(chalk.yellow(`\t\tgenerating Repository Binding Type file ...`));
    const repositoryBindingTypeGeneratedFile = await ejs.render(repositoryBindingTypeTemplateFile, {
        repositoryList
    });
    printAFile(repositoryBindingTypeGeneratedFile,`repository binding Type File`);
    fs.writeFile(repositoryBindingTypeFilePath, repositoryBindingTypeGeneratedFile, function (err) {
        if (err) throw err;
    });
    console.log(chalk.green('\t\tnew file regenerated : ',repositoryBindingTypeFilePath));
}


module.exports = { generateRepositoryBindingFunction , generateRepositoryBindingType , generateRepositoryInterfaceFile , generateRepositoryImplementationFile}