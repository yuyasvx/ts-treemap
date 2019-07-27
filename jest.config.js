const commonConfig = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testURL: 'http://localhost/'
}

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  },
  projects: [
    {
      ...commonConfig,
      testEnvironment: 'node',
      testMatch: ['<rootDir>/tests/unit/**/*.(spec|test).(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)']
    }
  ]
}
