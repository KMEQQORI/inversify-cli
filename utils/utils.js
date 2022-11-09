const chalk = require("chalk");


function firstLetterToLowerCase(string){
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function printAFile(fileContent,fileName){
    console.log(
        chalk.bgGreen(`\n\n\n\t\t\t|File Start : ${fileName}|\n`),
        chalk(fileContent),
        chalk.bgGreen(`\t\t\t|File End : ${fileName}|\n`)
    );
}


module.exports = { printAFile , firstLetterToLowerCase }