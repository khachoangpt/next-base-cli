import { execSync } from 'node:child_process'

export const clean = async (projectName: string) => {
  execSync(
    `cd ${projectName} && rm -rf .git pnpm-lock.yaml && npm pkg set name="${projectName}"`,
  )
}
