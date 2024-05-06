export function get(element: HTMLElement) {
  return getComputedStyle(element);
}

export function set(
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>,
) {
  for (const key in styles) {
    let val = styles[key] || "";

    if (typeof val === "number") {
      val = `${val}px`;
    }

    element.style[key] = val;
  }

  return element;
}
