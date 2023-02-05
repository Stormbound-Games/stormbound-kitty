import getGlobals from './src/helpers/jestSetup/globals.js'

export default async function getJestConfiguration() {
  const isPreview = Boolean(process.env.SANITY_PREVIEW_TOKEN)
  const globals = await getGlobals({ isPreview })

  return {
    testEnvironment: 'node',
    moduleNameMapper: {
      '^#api/(.*)$': '<rootDir>/src/api/$1',
      '^#components/(.*)$': '<rootDir>/src/components/$1',
      '^#constants/(.*)$': '<rootDir>/src/constants/$1',
      '^#helpers/(.*)$': '<rootDir>/src/helpers/$1',
      '^#hooks/(.*)$': '<rootDir>/src/hooks/$1',
    },
    testPathIgnorePatterns: [
      '<rootDir>/.next/',
      '<rootDir>/bin/',
      '<rootDir>/cms/',
      '<rootDir>/cypress/',
      '<rootDir>/docs/',
      '<rootDir>/node_modules/',
      '<rootDir>/public/',
    ],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    transformIgnorePatterns: ['/node_modules/'],
    testTimeout: 10000,
    setupFilesAfterEnv: [
      '<rootDir>/src/helpers/jestSetup/setupFilesAfterEnv.js',
    ],
    globals,
  }
}
