# CSS Animation Sequencer

CSS animations are pretty great but often one wants to chain together some animations on one or more elements. Enter the CSS Animation Sequencer.

The API couldn't be simpler:

    var sequencer = new CssAnimationSequencer()
    sequencer.add(someElement, "an-animation-class")
    sequencer.add(someOtherElement, "a-different-animation")
    sequencer.play()

Animations play in order one after the other.

The `play` method also accepts an options object with the following values:

- `loops`: The number of times to loop the sequence. The default value is 0. Setting this value to a negative number will run the sequence forever.

# Building

Until I get this published, clone the repo, `npm install`, and then `npm run build`. That will generate a `dist` folder with CommonJS, ES Module, IIFE, and UMD builds in both minified and unminified versions. Pick the one that works best for you and your toolchain.
