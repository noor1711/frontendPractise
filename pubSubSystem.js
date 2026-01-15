class EventEmitter {
  constructor() {
    this.listeners = new Map(); // map event name to its array of listerners
    this.emit = this.emitEvent;
    this.subscribe = this.subscribeToEvent;
  }

  subscribeToEvent(eventName, operation) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    this.listeners.get(eventName).push(operation);
    return () => this.unsubscribeEvent(eventName, operation);
  }

  unsubscribeEvent(eventName, operation) {
    if (!this.listeners.has(eventName)) {
      throw new Error("Event name not valid");
    }

    if (this.listeners.get(eventName).includes(operation)) {
      this.listeners
        .get(eventName)
        .splice(this.listeners.get(eventName).indexOf(operation), 1);
    }
  }

  emitEvent(eventName, args) {
    if (!this.listeners.has(eventName)) {
      throw new Error("Event name not valid");
    }

    this.listeners.get(eventName).forEach((operation) => {
      operation?.(args);
    });
  }
}

const bus = new EventEmitter();
const unsub = bus.subscribe("login", (user) => console.log(user));
bus.subscribe("login", (user) => console.log("num2", user));
bus.emit("login", { name: "RubrikUser" }); // logs { name: 'RubrikUser' }
unsub(); // removes the listener d
bus.emit("login", { name: "RubrikUser" }); // logs { åname: 'RubrikUser' }
