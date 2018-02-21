module.exports = {
  plugins: ['jest'],
  extends: ['@nickgravelyn/eslint-config'],
  overrides: [
    {
      files: ['*.test.js'],
      env: {
        'jest/globals': true,
      },
    },
  ],
}
