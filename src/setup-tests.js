window.System = {
  resolve: jest.fn(),
  register: jest.fn()
};

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};
