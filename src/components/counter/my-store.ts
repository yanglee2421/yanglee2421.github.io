class MyStore {
  #triggerSet = new Set<Trigger>();
  #count = 0;
  #data = {
    count: this.#count,
  };

  subscribe(trigger: Trigger): Unsubscribe {
    this.#triggerSet.add(trigger);
    console.log("subscribe");

    // ** Unsubscribe
    return () => {
      this.#triggerSet.delete(trigger);
      console.log("unsubscribe");
    };
  }

  getSnapshot() {
    if (!Object.is(this.#count, this.#data.count)) {
      this.#data = { ...this.#data, count: this.#count };
    }
    return this.#data;
  }

  dispatch() {
    this.#triggerSet.forEach((trigger) => {
      this.#count++;
      trigger();
    });
  }
}

export const myStore = new MyStore();

type Trigger = () => void;
type Unsubscribe = () => void;
