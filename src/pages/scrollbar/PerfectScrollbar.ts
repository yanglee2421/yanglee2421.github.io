import * as CSS from "./css";
import * as DOM from "./dom";
import { cls } from "./classNames";

export class PerfectScrollbar {
  containerHeight = 0;
  containerWidth = 0;
  contentHeight = 0;
  contentWidth = 0;

  isAlive = false;
  isNegativeScroll = false;
  isRtl = false;
  isScrollbarXUsingBottom = false;
  isScrollbarYUsingBottom = false;
  lastScrollLeft = false;
  lastScrollTop = false;
  isScrollbarYUsingRight = false;

  negativeScrollAdjustment = 0;
  railBorderXWidth = 0;
  railBorderYWidth = 0;
  railXMarginWidth = 0;
  railXRatio = 0;
  railXWidth = 0;
  railYHeight = 0;
  railYMarginHeight = 0;
  railYRatio = 0;

  scrollbarX = new HTMLElement();
  scrollbarXActive = false;
  scrollbarXBottom = 0;
  scrollbarXLeft = 0;
  scrollbarXRail = new HTMLElement();
  scrollbarXWidth = 0;
  scrollbarXTop = 0;

  scrollbarY = new HTMLElement();
  scrollbarYActive = false;
  scrollbarYHeight = 0;
  scrollbarYOuterWidth = 0;
  scrollbarYRail = new HTMLElement();
  scrollbarYRight = 0;
  scrollbarYTop = 0;
  scrollbarYLeft = 0;

  reach: Reach = {
    x: null,
    y: null,
  };

  constructor(
    public element: HTMLElement,
    public settings: Options = defaultSettings(),
  ) {}
}

function defaultSettings() {
  return {
    handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
    maxScrollbarLength: void 0,
    minScrollbarLength: void 0,
    scrollingThreshold: 1000,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0,
    suppressScrollX: false,
    suppressScrollY: false,
    swipeEasing: true,
    useBothWheelAxes: false,
    wheelPropagation: true,
    wheelSpeed: 1,
  };
}

interface Options {
  handlers?: string[];
  maxScrollbarLength?: number;
  minScrollbarLength?: number;
  scrollingThreshold?: number;
  scrollXMarginOffset: number;
  scrollYMarginOffset: number;
  suppressScrollX?: boolean;
  suppressScrollY?: boolean;
  swipeEasing?: boolean;
  useBothWheelAxes?: boolean;
  wheelPropagation?: boolean;
  wheelSpeed?: number;
}

type Reach = { x: "start" | "end" | null; y: "start" | "end" | null };
