---
layout: default
title: API Documentation
---

# CssAnimationSequencer

This is the main class that owns a sequence of animations.

### Methods

#### add(<element>, <className>)

The `add` method adds an animation to the sequence. It takes the HTML element to which to apply the animation and the class name of the CSS animation to apply.

**Note:** This is not the name of a `@keyframes` element, but rather a full CSS class that sets the `animation` property. This is to allow the animation to also set other properties required for the animation.

**Note:** The animation class should not use any looping. At this time only animations that play once and stop are supported.

#### play(<options>)

The `play` method starts animating the sequence. The `options` object can set any (or none) of the following settings:

  - `loops`: A number indicating the number of times to repeat the sequence. The default value is 0, meaning the sequence will play once through and stop. Setting the value to a negative value will repeat the animation forever.

#### stop()

The `stop` method stops the animation. This will clear the animation class from the element, returning it to its original state.
