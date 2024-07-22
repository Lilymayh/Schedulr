/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  rootDir: '.', // Ensure this is set to the project root
  setupFiles: ['dotenv/config'], // Load environment variables from .env file
};

module.exports = config;
