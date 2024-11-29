import inquirer from 'inquirer'
import { PackageManager } from 'src/constants'

export const askForPackageManager = async () => {
  const { projectManager } = await inquirer
    .prompt([
      {
        type: 'select',
        name: 'projectManager',
        message: 'Which project manager do you want to use?',
        choices: [PackageManager.PNPM, PackageManager.YARN, PackageManager.NPM],
        default: PackageManager.PNPM,
      },
    ])
    .catch(() => {
      process.exit(1)
    })
  return projectManager
}
