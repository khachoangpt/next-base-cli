import inquirer from 'inquirer'
import { UI } from 'src/constants'

export const askForUseUILibrary = async () => {
  const { uiLibrary } = await inquirer
    .prompt([
      {
        type: 'select',
        name: 'uiLibrary',
        message: 'Which UI library do you want to use?',
        choices: [UI.SHADCN],
        default: UI.SHADCN,
      },
    ])
    .catch(() => {
      process.exit(1)
    })

  return uiLibrary
}
