import path from 'path'
import { defineCliConfig } from 'sanity/cli'

const aliasPath = dir => path.resolve(__dirname, '..', 'src', dir)

export default defineCliConfig({
  api: {
    projectId: '5hlpazgd',
    dataset: 'production',
  },

  vite: prevConfig => {
    return {
      ...prevConfig,
      resolve: {
        ...prevConfig.resolve,
        alias: {
          ...prevConfig.resolve?.alias,
          '#api': aliasPath('api'),
          '#components': aliasPath('components'),
          '#constants': aliasPath('constants'),
          '#helpers': aliasPath('helpers'),
          '#hooks': aliasPath('hooks'),
        },
      },
    }
  },
})
