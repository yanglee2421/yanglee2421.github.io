class EventElement {
  constructor(
    public element: HTMLElement,
    public handlers: Record<string, Array<Handler>> = {},
  ) {}

  bind(eventName: string, handler: Handler) {
    if (typeof this.handlers[eventName] === "undefined") {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
    this.element.addEventListener(eventName, handler, false);
  }

  unbind(eventName: string, target?: Handler) {
    this.handlers[eventName] = this.handlers[eventName].filter((handler) => {
      if (target && !Object.is(target, handler)) {
        return true;
      }

      this.element.removeEventListener(eventName, handler, false);
      return false;
    });
  }

  unbindAll() {
    for (const name in this.handlers) {
      this.unbind(name);
    }
  }

  get isEmpty() {
    return Object.keys(this.handlers).every((key) => {
      return Object.is(this.handlers[key].length, 0);
    });
  }
}

export class EventManager {
  eventElements: EventElement[] = [];

  eventElement(element: HTMLElement) {
    let ee = this.eventElements.filter((ee) => ee.element === element)[0];
    if (!ee) {
      ee = new EventElement(element);
      this.eventElements.push(ee);
    }
    return ee;
  }

  bind(element: HTMLElement, eventName: string, handler: Handler) {
    this.eventElement(element).bind(eventName, handler);
  }

  unbind(element: HTMLElement, eventName: string, handler: Handler) {
    const ee = this.eventElement(element);
    ee.unbind(eventName, handler);

    if (ee.isEmpty) {
      // remove
      this.eventElements.splice(this.eventElements.indexOf(ee), 1);
    }
  }

  unbindAll() {
    this.eventElements.forEach((e) => e.unbindAll());
    this.eventElements = [];
  }

  once(element: HTMLElement, eventName: string, handler: Handler) {
    const ee = this.eventElement(element);
    const onceHandler = (evt: Event) => {
      ee.unbind(eventName, onceHandler);
      handler(evt);
    };
    ee.bind(eventName, onceHandler);
  }
}

type Handler = (evt: Event) => void;
