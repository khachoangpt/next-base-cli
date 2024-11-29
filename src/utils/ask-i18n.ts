import inquirer from 'inquirer'

export const askForI18n = async () => {
  const { i18n } = await inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'i18n',
        message: 'Do you want to use i18n?',
        default: false,
      },
    ])
    .catch(() => {
      process.exit(1)
    })
  return i18n
}
