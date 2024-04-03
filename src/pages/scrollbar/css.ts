export function get(element: HTMLElement) {
  return getComputedStyle(element);
}

export function set(element: HTMLElement, styles: CSSStyleDeclaration) {
  for (const key in styles) {
    let val: string | number = styles[key];

    if (typeof val === "number") {
      val = `${val}px`;
    }

    element.style[key] = val;
  }

  return element;
}
