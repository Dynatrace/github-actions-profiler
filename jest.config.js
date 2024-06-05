/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'reports',
      },
    ],
  ],
  collectCoverage: true,
  coverageDirectory: 'reports/coverage',
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point,
    // because Jest does not support package.json.exports.
    // See https://github.com/uuidjs/uuid/issues/451
    "uuid": require.resolve('uuid'),
},
};
