# Seashell 🐚

A lovely library for web animations.

Checkout the [examples](https://nickgravelyn.github.io/seashell) to get an idea of what the library can do. Read the [API docs](https://nickgravelyn.github.io/seashell/api) for the full API documentation.

## Usage

### For Built Apps

```
yarn add seashell-animation
```

or

```
npm add --save seashell-animation
```

Then you can import and use the library:

```js
import { Timeline } from 'seashell-animation'

let timeline = new Timeline()
// etc
```

### For Non-Built Apps

Simply take [docs/seashell.js](docs/seashell.js) which is precompiled to work in the browser for the example page. It defines a global Seashell which contains the Timeline class. See the [examples](https://nickgravelyn.github.io/seashell) source for more details.
