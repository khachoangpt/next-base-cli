import spawn from 'cross-spawn'
import { Command } from 'src/constants'
import {
  askForPackageManager,
  askForProjectName,
  clean,
  clone,
} from 'src/utils'
import { askForUseUILibrary } from 'src/utils/ask-ui-library'
import yargs from 'yargs'

export const createCommand = async () => {
  const createCommand = yargs.command({
    command: Command.CREATE,
    describe: 'Create a new Next.js project',
    handler: handleCreateCommand,
  })
  return createCommand.argv
}

const handleCreateCommand = async () => {
  const packageManager = await askForPackageManager()
  const projectName = await askForProjectName()
  // const i18n = await askForI18n()
  const uiLibrary = await askForUseUILibrary()
  await clone({ projectName, uiLibrary })
  await clean(projectName)
  spawn(packageManager, ['install'], {
    cwd: `./${projectName}`,
    stdio: 'inherit',
  })
}
