/**
  An event that sets style properties on an element.
*/
export class SetStyleEvent {
  /**
    Initializes the event.

    @param {HTMLElement} element -
      The element to apply the style to.
    @param {Object} style -
      An object representing the style keys and values to apply to the element.
  */
  constructor (element, style) {
    this._element = element
    this._style = style
  }

  /** @ignore */
  start (complete) {
    for (const key in this._style) {
      if (this._style.hasOwnProperty(key)) {
        this._element.style[key] = this._style[key]
      }
    }

    complete()
  }

  /** @ignore */
  stop () {
  }
}
