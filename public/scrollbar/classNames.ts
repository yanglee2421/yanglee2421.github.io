import type { PerfectScrollbar } from "./PerfectScrollbar";

export const cls = {
  main: "ps",
  rtl: "ps__rtl",
  element: {
    thumb: (x: string) => `ps__thumb-${x}`,
    rail: (x: string) => `ps__rail-${x}`,
    consuming: "ps__child--consume",
  },
  state: {
    focus: "ps--focus",
    clicking: "ps--clicking",
    active: (x: string) => `ps--active-${x}`,
    scrolling: (x: string) => `ps--scrolling-${x}`,
  },
};

const scrollingClassTimeout = { x: 0, y: 0 };

export function addScrollingClass(i: PerfectScrollbar, x: XY) {
  const classList = i.element.classList;
  const className = cls.state.scrolling(x);

  if (classList.contains(className)) {
    clearTimeout(scrollingClassTimeout[x]);
    return;
  }

  classList.add(className);
}

export function removeScrollingClass(i: PerfectScrollbar, x: XY) {
  scrollingClassTimeout[x] = setTimeout(
    () => i.isAlive && i.element.classList.remove(cls.state.scrolling(x)),
    i.settings.scrollingThreshold,
  );
}

export function setScrollingClassInstantly(i: PerfectScrollbar, x: XY) {
  addScrollingClass(i, x);
  removeScrollingClass(i, x);
}

type XY = "x" | "y";
