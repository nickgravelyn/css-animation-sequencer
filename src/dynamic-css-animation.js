/**
  A helper class for building CSS animations from code
*/
export class DynamicCssAnimation {
  /**
    Initializes a new animation.
  */
  constructor () {
    this._name = 'seashell-' + Math.random().toString(36).substring(2)
    this._duration = 0
    this._keyframes = []

    /**
      Sets the animation-delay property of the generated animation.
      @type {Number}
    */
    this.delay = 0

    /**
      Sets the animation-direction property of the generated animation.
      @type {String}
    */
    this.direction = 'normal'

    /**
      Sets the animation-fill-mode property of the generated animation.
      @type {String}
    */
    this.fillMode = 'none'

    /**
      Sets the animation-timing-function property of the generated animation.
      @type {String}
    */
    this.timingFunction = 'ease'

    /**
      Sets the animation-iteration-count property of the generated animation.
      @type {Number}
    */
    this.iterationCount = 1
  }

  /**
    Gets the name of the animation.

    The name is the CSS class to use with {@link CssAnimationEvent} or to manually
    apply to an element if not using {@link Timeline}.

    @type {String}
  */
  get name () {
    return this._name
  }

  /**
    Adds a new keyframe to the animation.

    @param {Number} duration - The amount of time (in seconds) to animate to this frame.
    @param {Object} style - An object representing CSS style attributes and their values.
    @return {DynamicCssAnimation} The animation, for call chaining.
  */
  addKeyFrame (duration, style) {
    this._keyframes.push({ duration, style })
    this._duration += duration
    return this
  }

  /**
    Generates the CSS style and appends it to the document head.

    Generally you should call this method before using the animation so the browser
    has the CSS. Alternatively you can use {@link createCssString} to create the
    CSS and then insert it into the document yourself.

    If you use this method for an animation you don't plan to re-use, you should at
    some point call {@link destroyStyle} to remove the generated style block from
    the document.
  */
  generateStyle () {
    if (!this._styleSheet) {
      this._styleSheet = document.createElement('style')
      this._styleSheet.dataset.seashell = this._name
      document.head.appendChild(this._styleSheet)
    }

    this._styleSheet.textContent = this.createCssString()
  }

  /**
    Removes the style block inserted by {@link generateStyle}.
  */
  destroyStyle () {
    if (this._styleSheet) {
      this._styleSheet.parentNode.removeChild(this._styleSheet)
      this._styleSheet = null
    }
  }

  /**
    Creates the CSS for this animation.

    This method is used internally by {@link generateStyle}, which is the recommended
    method to use when using this class for animations. However if you would rather
    manage inserting the CSS into the document you can call this method to simply
    get the CSS as a string.

    @return {String} The CSS for the animation.
  */
  createCssString () {
    const name = this._name
    let css = `.${name} {
  animation-delay: ${this.delay}s;
  animation-direction: ${this.direction};
  animation-duration: ${this._duration}s;
  animation-fill-mode: ${this.fillMode};
  animation-iteration-count: ${this.iterationCount};
  animation-name: ${name};
  animation-timing-function: ${this.timingFunction};
}
@keyframes ${name} {\n`

    let runningTime = 0
    for (let i = 0, len = this._keyframes.length; i < len; ++i) {
      const frame = this._keyframes[i]
      runningTime += frame.duration
      const percentage = runningTime === 0 ? 0 : runningTime / this._duration * 100
      css += `  ${percentage}% {\n`
      for (const key in frame.style) {
        if (frame.style.hasOwnProperty(key)) {
          css += `    ${key}: ${frame.style[key]};\n`
        }
      }
      css += '  }\n'
    }

    css += '}'
    return css
  }
}
