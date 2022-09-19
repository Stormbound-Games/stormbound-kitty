require('module-alias/register')

module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
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
  setupFilesAfterEnv: ['<rootDir>/src/helpers/jestSetup/setupFilesAfterEnv.js'],
  globalSetup: '<rootDir>/src/helpers/jestSetup/globalSetup.js',
}
