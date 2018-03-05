module.exports = {
  plugins: ['jest'],
  extends: ['@nickgravelyn/eslint-config'],
  overrides: [
    {
      files: ['src/test/*.js', '*.test.js'],
      env: {
        'jest/globals': true,
      },
    },
  ],
}
