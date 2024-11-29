import inquirer from 'inquirer'
import { configs } from 'src/constants'

export const askForUseComponentLibrary = async () => {
  const { isUseComponentLibrary } = await inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'isUseComponentLibrary',
        message: 'Do you want to use the component library?',
        default: true,
      },
    ])
    .catch(() => {
      process.exit(1)
    })

  if (!isUseComponentLibrary) return { components: [] }
  const { components } = await inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'components',
        message: 'Which components do you want to use?',
        choices: configs.components,
      },
    ])
    .catch(() => {
      process.exit(1)
    })

  return { components: components as string[] }
}
