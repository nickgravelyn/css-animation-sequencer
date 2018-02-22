# Seashell

CSS animations are pretty great. Seashell makes it easier to generate a timeline of animations, defined in Javascript, so you can have all the power of CSS animations while being able to create and sequence them in script.

Checkout the [example](https://nickgravelyn.github.io/seashell) where you can inspect the source to see how the library works.

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
...
```

### For Non-Built Apps

Simply take [docs/seashell.js](docs/seashell.js) which is precompiled to work in the browser for the example page. It defines a global Seashell which contains the Timeline class. See the [example](https://nickgravelyn.github.io/seashell) source for a great example of that.
