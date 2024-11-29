import spawn from 'cross-spawn'
import { Command } from 'src/constants'
import {
  askForI18n,
  askForPackageManager,
  askForProjectName,
  clean,
  clone,
} from 'src/utils'
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
  const i18n = await askForI18n()
  // const components = await askForUseComponentLibrary()
  await clone({ projectName, i18n })
  await clean(projectName)
  spawn(packageManager, ['install'], {
    cwd: `./${projectName}`,
    stdio: 'inherit',
  })
}
