export function div(className: string) {
  const div = document.createElement("div");
  div.className = className;
  return div;
}

export function matches(element: HTMLElement, query: string) {
  return element.matches(query);
}

export function remove(element: HTMLElement) {
  element.remove();
}

export function queryChildren(element: HTMLElement, selector: string) {
  return Array.prototype.filter.call(element.children, (child) =>
    matches(child, selector),
  );
}
