module.exports = {
  plugins: ['jest'],
  extends: ['@nickgravelyn/eslint-config'],
  overrides: [
    {
      files: ['spec/*.js'],
      env: {
        'jest/globals': true,
      },
    },
  ],
}
