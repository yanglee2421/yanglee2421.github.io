import * as CSS from "./css";
import * as DOM from "./dom";
import { cls } from "./classNames";
import { toInt } from "./util";
import type { PerfectScrollbar } from "./PerfectScrollbar";

export default function (i: PerfectScrollbar) {
  const element = i.element;
  const roundedScrollTop = Math.floor(element.scrollTop);
  const rect = element.getBoundingClientRect();

  i.containerWidth = Math.round(rect.width);
  i.containerHeight = Math.round(rect.height);

  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  if (!element.contains(i.scrollbarXRail)) {
    // clean up and append
    DOM.queryChildren(element, cls.element.rail("x")).forEach((el) =>
      DOM.remove(el),
    );
    element.appendChild(i.scrollbarXRail);
  }
  if (!element.contains(i.scrollbarYRail)) {
    // clean up and append
    DOM.queryChildren(element, cls.element.rail("y")).forEach((el) =>
      DOM.remove(el),
    );
    element.appendChild(i.scrollbarYRail);
  }

  if (
    !i.settings.suppressScrollX &&
    i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth
  ) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(
      i,
      toInt(String((i.railXWidth * i.containerWidth) / i.contentWidth)),
    );
    i.scrollbarXLeft = toInt(
      String(
        ((i.negativeScrollAdjustment + element.scrollLeft) *
          (i.railXWidth - i.scrollbarXWidth)) /
          (i.contentWidth - i.containerWidth),
      ),
    );
  } else {
    i.scrollbarXActive = false;
  }

  if (
    !i.settings.suppressScrollY &&
    i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight
  ) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(
      i,
      toInt(String((i.railYHeight * i.containerHeight) / i.contentHeight)),
    );
    i.scrollbarYTop = toInt(
      String(
        (roundedScrollTop * (i.railYHeight - i.scrollbarYHeight)) /
          (i.contentHeight - i.containerHeight),
      ),
    );
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    element.classList.add(cls.state.active("x"));
  } else {
    element.classList.remove(cls.state.active("x"));
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    element.scrollLeft = i.isRtl === true ? i.contentWidth : 0;
  }
  if (i.scrollbarYActive) {
    element.classList.add(cls.state.active("y"));
  } else {
    element.classList.remove(cls.state.active("y"));
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    element.scrollTop = 0;
  }
}

function getThumbSize(i: PerfectScrollbar, thumbSize: number) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element: HTMLElement, i: PerfectScrollbar) {
  const xRailOffset = {
    top: "0",
    bottom: "0",
    left: "0",
    width: i.railXWidth + "px",
  };
  const roundedScrollTop = Math.floor(element.scrollTop);

  if (i.isRtl) {
    xRailOffset.left =
      i.negativeScrollAdjustment +
      element.scrollLeft +
      i.containerWidth -
      i.contentWidth +
      "px";
  } else {
    xRailOffset.left = element.scrollLeft + "px";
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - roundedScrollTop + "px";
  } else {
    xRailOffset.top = i.scrollbarXTop + roundedScrollTop + "px";
  }
  CSS.set(i.scrollbarXRail, xRailOffset);

  const yRailOffset = {
    top: roundedScrollTop + "px",
    right: "0",
    bottom: "0",
    left: "0",
    height: i.railYHeight + "px",
  };
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right =
        i.contentWidth -
        (i.negativeScrollAdjustment + element.scrollLeft) -
        i.scrollbarYRight -
        i.scrollbarYOuterWidth -
        9 +
        "px";
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft + "px";
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left =
        i.negativeScrollAdjustment +
        element.scrollLeft +
        i.containerWidth * 2 -
        i.contentWidth -
        i.scrollbarYLeft -
        i.scrollbarYOuterWidth +
        "px";
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft + "px";
    }
  }
  CSS.set(i.scrollbarYRail, yRailOffset);

  CSS.set(i.scrollbarX, {
    left: i.scrollbarXLeft + "px",
    width: i.scrollbarXWidth - i.railBorderXWidth + "px",
  });
  CSS.set(i.scrollbarY, {
    top: i.scrollbarYTop + "px",
    height: i.scrollbarYHeight - i.railBorderYWidth + "px",
  });
}
