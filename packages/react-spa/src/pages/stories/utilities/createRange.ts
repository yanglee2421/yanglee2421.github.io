const defaultInitializer = (index: number) => index;

export function createRange(length: number): number[];
export function createRange<TElement>(
  length: number,
  initializer: (index: number) => TElement,
): TElement[];
export function createRange<TElement>(
  length: number,
  initializer?: (index: number) => TElement,
): (number | TElement)[] {
  const initializerFn = initializer ?? defaultInitializer;

  return Array.from({ length }, (_, index) => initializerFn(index));
}
