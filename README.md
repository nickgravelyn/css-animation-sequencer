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
