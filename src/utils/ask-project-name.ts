/* eslint-disable no-console */
import fs from 'node:fs'

import inquirer from 'inquirer'

export const askForProjectName = async () => {
  const chalk = (await import('chalk')).default
  const promptResult = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'projectName',
        message: "What's the name of your project?",
        default: 'next-base',
        filter: (input) => {
          return input.toLowerCase()
        },
        validate: (input) => {
          if (!input.trim().length) {
            return 'Please enter a project name'
          }
          return true
        },
      },
    ])
    .catch(() => {
      process.exit(1)
    })

  if (fs.existsSync(promptResult?.projectName)) {
    console.log(
      chalk.red(`Project ${promptResult?.projectName} already exists`),
    )
    await askForProjectName()
  } else {
    return promptResult?.projectName
  }
}
