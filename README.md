# CSS Animation Sequencer

CSS animations are pretty great but often one wants to chain together some animations on one or more elements. Enter the CSS Animation Sequencer.

Checkout the [example](https://nickgravelyn.github.io/css-animation-sequencer) or the [API docs](https://nickgravelyn.github.io/css-animation-sequencer/api).

# Get It

Once the library is more complete I will publish it to NPM, but until then there are two options to grab it:

## IIFE Version

You can grab the latest build of the library as an IIFE from [the docs folder](docs/css-animation-sequencer.iife.js).

## DIY

You can also easily build the library yourself.

1. Clone the repo.
2. `yarn` (or `npm install`) to install development dependencies.
3. `yarn build` (or `npm run build`).

That will generate a `dist` folder with CommonJS, ES Module, IIFE, and UMD builds in both minified and unminified versions. Pick the one that works best for you and your toolchain.

# Development

Use `yarn watch` to build on changes. `yarn docs` to run an HTTP server on the docs directory which is used for Github Pages.
