/** @ignore */
export function applyStyle (element, style) {
  for (const key in style) {
    if (style.hasOwnProperty(key)) {
      element.style[key] = style[key]
    }
  }
}
