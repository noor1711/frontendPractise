class AbortSignal {
  constructor() {
    this.aborted = false;
    this.onAbort = null;
    this.listeners = [];
  }

  addEventListener(type, callback) {
    if (type === "abort") {
      this.listeners.push(callback);
    }
  }

  _trigger() {
    if (this.aborted) {
      return;
    }
    this.aborted = true;

    this.onAbort?.();

    this.listeners.forEach((callback) => callback());
  }
}

class AbortController {
  constructor() {
    this.signal = new AbortSignal();
  }

  abort() {
    this.signal._trigger();
  }
}
