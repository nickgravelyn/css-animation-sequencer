export const createMockEvent = (startImpl) => {
  if (!startImpl) {
    startImpl = complete => { complete() }
  }
  return {
    start: jest.fn().mockImplementation(startImpl),
    stop: jest.fn(),
  }
}

export const createMockEventThatDoesntCompleteAutomatically = () => {
  return createMockEvent(function (complete) { this.complete = complete })
}
