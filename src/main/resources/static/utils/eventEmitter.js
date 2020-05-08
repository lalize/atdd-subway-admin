const EventEmitter = () => {
  const events = new Map();

  const on = (type, listener) => {
    const event = events.get(type);
    if (event) {
      event.push(listener);
      return;
    }
    events.set(type, [listener]);
  };

  const emit = (type, data) => {
    const event = events.get(type);
    if (event) {
      event.map(listener => listener(data));
    }
  };

  const clear = () => events.clear();

  return {
    on,
    emit,
    clear
  };
}

export default EventEmitter;