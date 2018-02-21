# Seashell

CSS animations are pretty great. Seashell makes them better by providing a Sequence that lets you chain together animations on multiple objects to create interesting effects and an AnimationBuilder that helps you dynamically generate CSS keyframes animations.

Checkout the [example](https://nickgravelyn.github.io/seashell) where you can inspect the source to see how the library works.

# Get It

Once the library is more complete I will publish it to NPM, but until then there are two options to grab it:

## IIFE Version

You can grab the latest build of the library as an IIFE from [the docs folder](docs/seashell.iife.js).

## DIY

You can also easily build the library yourself.

1. Clone the repo.
2. `yarn` (or `npm install`) to install development dependencies.
3. `yarn build` (or `npm run build`).

That will generate a `dist` folder with CommonJS, ES Module, IIFE, and UMD builds in both minified and unminified versions. Pick the one that works best for you and your toolchain.

# Development

Use `yarn watch` to build on changes. `yarn docs` to run an HTTP server on the docs directory which is used for Github Pages. `yarn test` runs the tests.
