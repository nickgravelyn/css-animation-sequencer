export class SetStyleEvent {
  constructor (element, style) {
    this._element = element
    this._style = style
  }

  start (complete) {
    for (const key in this._style) {
      if (this._style.hasOwnProperty(key)) {
        this._element.style[key] = this._style[key]
      }
    }

    complete()
  }
}
