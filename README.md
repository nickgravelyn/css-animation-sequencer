# Seashell 🐚
A lovely library for web animations.

Checkout the [examples](https://nickgravelyn.github.io/seashell) to get an idea of what the library can do. Read the [API docs](https://nickgravelyn.github.io/seashell/api) for the full API documentation.

## Development Ended
This project was a fun learning experiment for me, but as I've built more front end things I'm not convinced that there aren't already better solutions. If you're doing web animations I highly recommend looking at these libraries:

* [Popmotion](https://popmotion.io/pure/)
* [Popmotion Pose](https://popmotion.io/pose/)
* [anime.js](http://animejs.com)

Seashell will continue to remain available as a CSS animation library, but I have no plans to continue building on it.

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
