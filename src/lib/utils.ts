import { FALLBACK_LANG, LANGS } from "./constants";

export function onAnimationFrame(cb: () => void) {
  let animate = 0;

  const run = () => {
    animate = requestAnimationFrame(run);
    cb();
  };

  run();

  return () => cancelAnimationFrame(animate);
}

export const android_ripple = (color: string) => ({
  color,
  foreground: true,
  borderless: false,
});

export const modeToIsDark = (
  mode: "dark" | "light" | "system",
  inDark: boolean,
) => {
  switch (mode) {
    case "dark":
      return true;
    case "light":
      return false;
    case "system":
    default:
      return inDark;
  }
};

export const getMatchedLang = (path = "", state: string) => {
  if (LANGS.has(path)) {
    return path;
  }

  if (LANGS.has(state)) {
    return state;
  }

  return FALLBACK_LANG;
};

export class AnimateController {
  constructor(private readonly animate: () => void) {}

  #animateId = 0;
  play() {
    this.#animateId = requestAnimationFrame(this.play.bind(this));

    this.animate();
  }
  abort() {
    cancelAnimationFrame(this.#animateId);
  }
}

export class GetRandom {
  constructor(
    private readonly min: number,
    private readonly max: number,
  ) {}
  get() {
    return Math.random() * (this.max - this.min) + this.min;
  }
}

export function withoutFalsy(list: unknown[]) {
  return list.every(Boolean);
}

export function withinTruthy(list: unknown[]) {
  return list.some(Boolean);
}

type Ops = {
  key: string | symbol;
  overwrite: boolean;
};

export const uniqBy = <TItem extends NonNullable<unknown>>(
  items: TItem[],
  ops: Partial<Ops> = {},
) => {
  const { overwrite = false, key = "id" } = ops;

  const map = items.reduce((map, item) => {
    const mapKey = Reflect.get(item, key);

    if (overwrite) {
      map.set(mapKey, item);
      return map;
    }

    if (!map.get(mapKey)) {
      map.set(mapKey, item);
    }

    return map;
  }, new Map<unknown, TItem>());

  return [...map.values()];
};

export const toStringTag = (target: unknown) => {
  return Object.prototype.toString
    .call(target)
    .replace(/\[object (\w+)\]/, "$1")
    .toLocaleLowerCase();
};

export const timeout = (time = 0) => {
  return new Promise<void>((res) => {
    setTimeout(res, time);
  });
};

export const stringToColor = (string: string) => {
  let hash = 0;

  for (let i = 0; i < string.length; i++) {
    // 9 << 3 => 9 * (2 ** 3) = 36
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const minmax = (
  value: number,
  {
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
  }: Partial<Option> = {},
) => {
  return Math.min(max, Math.max(min, value));
};

type Option = {
  min: number;
  max: number;
};

export const jsonClone = <TData>(params: TData) => {
  try {
    return JSON.parse(JSON.stringify(params)) as TData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fileToFileKey = (file: File) => {
  return [file.lastModified, file.name, file.size, file.type].join("-");
};

export const json2CsvLink = <TRow extends NonNullable<unknown>>(
  rows: Array<TRow>,
) => {
  return encodeURI(
    "data:text/csv;charset=utf-8," +
      [
        Object.keys(rows[0]).join(","),
        ...rows.map(Object.values).join(","),
      ].join("\n"),
  );
};

type TreeRow<TRow> = TRow & {
  children: Array<TreeRow<TRow>>;
};

export const list2Tree = <
  TRow extends {
    id: number;
    parentId: number;
  },
>(
  list: TRow[],
) => {
  const allIds = list.map((item) => item.id);
  const clonedList = structuredClone(list);

  clonedList.forEach((item, idx, arr) => {
    void idx;

    Reflect.set(
      item,
      "children",
      arr.filter((el) => Object.is(el.parentId, item.id)),
    );
  });

  return clonedList.filter(
    (item): item is TreeRow<TRow> => !allIds.includes(item.parentId),
  );
};

export const timeAgo = (date: Date) => {
  const now = Date.now();
  const time = date.getTime();

  const days = Math.floor((now - time) / (1000 * 60 * 60 * 24));

  if (days) {
    return `${days} days ago`;
  }

  const hours = Math.floor((now - time) / (1000 * 60 * 60));

  if (hours) {
    return `${hours} hours ago`;
  }

  const minutes = Math.floor((now - time) / (1000 * 60));

  if (minutes) {
    return `${minutes} minutes ago`;
  }

  const seconds = Math.floor((now - time) / 1000);

  if (seconds) {
    return `${seconds} seconds ago`;
  }

  return "a few seconds ago";
};

export const toTimeCarry = (
  totalTime: number,
  unit: number,
): [number, number] => {
  return [Math.floor(totalTime / unit), totalTime % unit];
};

export const countdown = (date: Date) => {
  const [day, restDay] = toTimeCarry(
    date.getTime() - Date.now(),
    1000 * 60 * 60 * 24,
  );

  const [hour, restHour] = toTimeCarry(restDay, 1000 * 60 * 60);
  const [min, restMin] = toTimeCarry(restHour, 1000 * 60);
  const [sec, restSec] = toTimeCarry(restMin, 1000);

  return `${day}天/${hour}小时/${min}分/${sec}秒/${restSec}毫秒`;
};

type Falsey = null | undefined | false | "" | 0 | 0n;

export const compact = <TData>(list: Array<TData | Falsey>) => {
  return list.filter(Boolean) as TData;
};

export const log: typeof console.log = (...args) => {
  if (import.meta.env.DEV) {
    console.log(...args);
  }
};

export const warn: typeof console.warn = (...args) => {
  if (import.meta.env.DEV) {
    console.warn(...args);
  }
};

export const error: typeof console.error = (...args) => {
  if (import.meta.env.DEV) {
    console.error(...args);
  }
};

export const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

export const chunk = <TData>(list: TData[], size: number) => {
  const chunked: TData[][] = [];

  for (let i = 0; i < list.length; i += size) {
    chunked.push(list.slice(i, i + size));
  }

  return chunked;
};
