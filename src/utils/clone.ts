import { execSync } from 'node:child_process'

import { configs } from 'src/constants'

type CloneOptions = {
  projectName?: string
  i18n?: boolean
}

export const clone = async ({ projectName, i18n = false }: CloneOptions) => {
  const { defaultProjectName, projectBaseUrl, projectWithI18nUrl } = configs
  const url = i18n ? projectWithI18nUrl : projectBaseUrl
  const name = projectName ?? defaultProjectName

  execSync(`git clone ${url} ${name}`)
}
