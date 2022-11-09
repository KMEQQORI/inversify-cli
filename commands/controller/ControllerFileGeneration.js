const ejs = require("ejs");
const chalk = require("chalk");
const fs = require('fs');
const controllerBindingTemplateFile = require("./fileTemplate/controller-binding-function-template")
const controllerTemplateFile = require("./fileTemplate/controller-template")
const { printAFile, firstLetterToLowerCase} = require("../../utils/utils")


async function generateControllerFile(controllerFilePath,controllerName,relatedServiceInterfaceName,relatedServiceInterfacePath) {
    console.log(chalk.yellow(`\t\tgenerating controller ${controllerName}.ts ...`));

    console.log("firstLetterToLowerCase(relatedServiceInterfaceName)",firstLetterToLowerCase(relatedServiceInterfaceName))
    if(!fs.existsSync(`${controllerFilePath}.ts`)){
        const controllerGeneratedFile = await ejs.render(controllerTemplateFile, {
            controllerName,
            relatedServiceInterfaceName,
            relatedServiceInterfaceVariable : firstLetterToLowerCase(relatedServiceInterfaceName),
            relatedServiceInterfacePath
        });
        printAFile(controllerGeneratedFile,`${controllerName}.ts`);
        fs.writeFile(`${controllerFilePath}.ts`, controllerGeneratedFile, function (err) {
            if (err) throw err;
        });
        console.log(chalk.green('\t\tfile created : ',`${controllerName}.ts`));
    }else{
        console.log(chalk.yellowBright('\t\tfile already exist : ',`${controllerName}.ts`));
    }
}

async function generateControllerBindingFunction(controllerBindingFunctionFilePath,controllerList) {
    console.log(chalk.yellow(`\t\tgenerating Controller Binding function file ...`));
    const controllerBindingFunctionGeneratedFile = await ejs.render(controllerBindingTemplateFile, {
        controllerList
    });
    printAFile(controllerBindingFunctionGeneratedFile,`controller binding File`);
    fs.writeFile(controllerBindingFunctionFilePath, controllerBindingFunctionGeneratedFile, function (err) {
        if (err) throw err;
    });
    console.log(chalk.green('\t\tnew file regenerated : ',controllerBindingFunctionFilePath));
}


module.exports = { generateControllerFile, generateControllerBindingFunction }