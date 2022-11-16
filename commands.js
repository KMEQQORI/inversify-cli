#! /usr/bin/env node

const { program } = require('commander')

const initAndPrintConfiguration = require('./commands/config/printConfiguration')
const resetConfiguration = require('./commands/config/resetConfiguration')

const newRepository = require('./commands/repository/newRepository')
const regenerateRepository = require("./commands/repository/regenerateRepository")
const printRepository = require("./commands/repository/printRepository")

const newService = require('./commands/service/newService')
const regenerateService = require("./commands/service/regenerateService")
const printService = require("./commands/service/printService")

const newController = require('./commands/controller/newController')
const regenerateController = require("./commands/controller/regenerateController")
const printController = require("./commands/controller/printController")

program
    .command('config-print')
    .description('handle files paths configurations')
    .action(initAndPrintConfiguration)
program
    .command('config-reset')
    .description('handle files paths configurations')
    .action(resetConfiguration)


program
    .command('repository-print')
    .description('print repositories mapping matrice')
    .action(printRepository)
program
    .command('repository-new')
    .description('add new repository binding')
    .action(newRepository)
program
    .command('repository-regenerate')
    .description('regenerate All repositories Files,binding and type ...')
    .action(regenerateRepository)


program
    .command('service-print')
    .description('print service mapping matrice')
    .action(printService)
program
    .command('service-new')
    .description('add new service binding')
    .action(newService)
program
    .command('service-regenerate')
    .description('regenerate All service Files,binding and type ...')
    .action(regenerateService)

program
    .command('controller-print')
    .description('print controller mapping matrice')
    .action(printController)
program
    .command('controller-new')
    .description('add new controller binding')
    .action(newController)
program
    .command('controller-regenerate')
    .description('regenerate All controller Files,binding and type ...')
    .action(regenerateController)

program.parse()