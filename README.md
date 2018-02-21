# Seashell

CSS animations are pretty great. Seashell makes it easier to generate a timeline of animations, defined in Javascript, so you can have all the power of CSS animations while being able to create and sequence them in script.

Checkout the [example](https://nickgravelyn.github.io/seashell) where you can inspect the source to see how the library works.

## Usage

### For Built Apps

```
yarn add nickgravelyn/seashell
```

or
  
```
npm add --save nickgravelyn/seashell
```
  
Then you can import and use the library:

```js
import { Timeline } from 'seashell'

let timeline = new Timeline()
timeline.to(...)
timeline.run(...)
```

### For Non-Built Apps

Simply take [dist/seashell.iife.js](dist/seashell.iife.js) which is precompiled to work in the browser. It defines a global Seashell which contains the Timeline class. See the [example](https://nickgravelyn.github.io/seashell) source for a great example of that.
