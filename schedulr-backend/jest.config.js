/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$', // Ensure it matches your test files
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  rootDir: '.', // Project root
  setupFiles: ['dotenv/config'],
};

module.exports = config;
