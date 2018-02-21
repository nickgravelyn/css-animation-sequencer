export default (element, state) => {
  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      element.style[key] = state[key]
    }
  }
}
