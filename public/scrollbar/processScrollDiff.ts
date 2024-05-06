import { setScrollingClassInstantly } from "./classNames";
import type { PerfectScrollbar } from "./PerfectScrollbar";

export default function (
  i: PerfectScrollbar,
  axis: "top" | "left",
  diff: number,
  useScrollingClass = true,
  forceFireReachEvent = false,
) {
  let fields: Fields;

  if (axis === "top") {
    fields = [
      "contentHeight",
      "containerHeight",
      "scrollTop",
      "y",
      "up",
      "down",
    ];
  } else if (axis === "left") {
    fields = [
      "contentWidth",
      "containerWidth",
      "scrollLeft",
      "x",
      "left",
      "right",
    ];
  } else {
    throw new Error("A proper axis should be provided");
  }

  processScrollDiff(i, diff, fields, useScrollingClass, forceFireReachEvent);
}

function createEvent(name: string) {
  return new CustomEvent(name);
}

function processScrollDiff(
  i: PerfectScrollbar,
  diff: number,
  [contentHeight, containerHeight, scrollTop, y, up, down]: Fields,
  useScrollingClass = true,
  forceFireReachEvent = false,
) {
  const element = i.element;

  // reset reach
  i.reach[y] = null;

  // 1 for subpixel rounding
  if (element[scrollTop] < 1) {
    i.reach[y] = "start";
  }

  // 1 for subpixel rounding
  if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
    i.reach[y] = "end";
  }

  if (diff) {
    element.dispatchEvent(createEvent(`ps-scroll-${y}`));

    if (diff < 0) {
      element.dispatchEvent(createEvent(`ps-scroll-${up}`));
    } else if (diff > 0) {
      element.dispatchEvent(createEvent(`ps-scroll-${down}`));
    }

    if (useScrollingClass) {
      setScrollingClassInstantly(i, y);
    }
  }

  if (i.reach[y] && (diff || forceFireReachEvent)) {
    element.dispatchEvent(createEvent(`ps-${y}-reach-${i.reach[y]}`));
  }
}

type Fields =
  | ["contentHeight", "containerHeight", "scrollTop", "y", "up", "down"]
  | ["contentWidth", "containerWidth", "scrollLeft", "x", "left", "right"];
