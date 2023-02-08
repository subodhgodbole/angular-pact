module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['./src/setup-jest.ts'],
  verbose: true,
 globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.spec.json',
    },
  }
};
