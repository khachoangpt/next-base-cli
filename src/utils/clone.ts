import { execSync } from 'node:child_process'

import { configs } from 'src/constants'

type CloneOptions = {
  projectName?: string
  i18n?: boolean
  uiLibrary?: 'shadcn'
}

export const clone = async ({ projectName, uiLibrary }: CloneOptions) => {
  const { defaultProjectName, projectBaseShadcnUrl } = configs
  let url = ''
  if (uiLibrary === 'shadcn') {
    url = projectBaseShadcnUrl
  }
  // if (i18n) {
  //   url = projectWithI18nUrl
  // }
  const name = projectName ?? defaultProjectName

  execSync(`git clone ${url} ${name}`)
}
