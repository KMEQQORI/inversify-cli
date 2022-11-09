const ejs = require("ejs");
const chalk = require("chalk");
const fs = require('fs');
const serviceBindingTemplateFile = require("./fileTemplate/service-binding-function-template")
const serviceBindingTypeTemplateFile = require("./fileTemplate/service-binding-type-template")
const serviceInterfaceTemplateFile = require("./fileTemplate/service-interface-template")
const serviceImplementationTemplateFile = require("./fileTemplate/service-Implementation-template")
const { printAFile } = require("../../utils/utils")


async function generateServiceInterfaceFile(serviceInterfaceFilePath,interfaceName) {
    console.log(chalk.yellow(`\t\tgenerating interface ${interfaceName}.ts ...`));

    if(!fs.existsSync(`${serviceInterfaceFilePath}.ts`)){
        const serviceInterfaceGeneratedFile = await ejs.render(serviceInterfaceTemplateFile, {
            interfaceName
        });
        printAFile(serviceInterfaceGeneratedFile,`${interfaceName}.ts`);
        fs.writeFile(`${serviceInterfaceFilePath}.ts`, serviceInterfaceGeneratedFile, function (err) {
            if (err) throw err;
        });
        console.log(chalk.green('\t\tfile created : ',`${interfaceName}.ts`));
    } else {
        console.log(chalk.yellowBright('\t\tfile already exist : ',`${interfaceName}.ts`));
    }
}

async function generateServiceImplementationFile(serviceImplementationFilePath,interfaceName,implementationName) {
    console.log(chalk.yellow(`\t\tgenerating implementation ${implementationName}.ts`));
    if(!fs.existsSync(`${serviceImplementationFilePath}.ts`)) {
        const serviceImplementationGeneratedFile = await ejs.render(serviceImplementationTemplateFile, {
            interfaceName,
            implementationName
        });
        printAFile(serviceImplementationGeneratedFile,`${implementationName}.ts`);
        fs.writeFile(`${serviceImplementationFilePath}.ts`, serviceImplementationGeneratedFile, function (err) {
            if (err) throw err;
        });
        console.log(chalk.green('\t\tfile created : ', `${implementationName}.ts`));
    }else{
        console.log(chalk.yellowBright('\t\tfile already exist : ',`${implementationName}.ts`));
    }
}

async function generateServiceBindingFunction(serviceBindingFunctionFilePath,serviceList) {
    console.log(chalk.yellow(`\t\tgenerating Service Binding function file ...`));
    const serviceBindingFunctionGeneratedFile = await ejs.render(serviceBindingTemplateFile, {
        serviceList
    });
    printAFile(serviceBindingFunctionGeneratedFile,`service binding File`);
    fs.writeFile(serviceBindingFunctionFilePath, serviceBindingFunctionGeneratedFile, function (err) {
        if (err) throw err;
    });
    console.log(chalk.green('\t\tnew file regenerated : ',serviceBindingFunctionFilePath));
}

async function generateServiceBindingType(serviceBindingTypeFilePath,serviceList) {
    console.log(chalk.yellow(`\t\tgenerating Service Binding Type file ...`));
    const serviceBindingTypeGeneratedFile = await ejs.render(serviceBindingTypeTemplateFile, {
        serviceList
    });
    printAFile(serviceBindingTypeGeneratedFile,`service binding Type File`);
    fs.writeFile(serviceBindingTypeFilePath, serviceBindingTypeGeneratedFile, function (err) {
        if (err) throw err;
    });
    console.log(chalk.green('\t\tnew file regenerated : ',serviceBindingTypeFilePath));
}


module.exports = { generateServiceBindingFunction , generateServiceBindingType , generateServiceInterfaceFile , generateServiceImplementationFile}