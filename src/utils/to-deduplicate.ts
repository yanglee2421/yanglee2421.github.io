export function toDeduplicate(items: unknown[], ops: Partial<Ops> = {}) {
  const { overwrite = false, key = "id" } = ops;

  const map = new Map();

  items.forEach((item) => {
    // Item must be an object
    if (typeof item !== "object") {
      console.error("Excepted an object");
      return;
    }

    if (!item) {
      console.error("Excepted an object, got a falsy!");
      return;
    }

    // Get Key
    const keyValue = Reflect.get(item, key);
    if (!keyValue) {
      console.error("Excepted a truth, got a falsy!");
      return;
    }

    // Whether to allow overwriting
    if (overwrite) {
      map.set(key, item);
      return;
    }

    map.get(key) ?? map.set(key, item);
  });

  return [...map.values()];
}

interface Ops {
  key: string | symbol;
  overwrite: boolean;
}
