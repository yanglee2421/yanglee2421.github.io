export function minmax(
  value: number,
  {
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
  }: Partial<Option> = {},
) {
  return Math.min(max, Math.max(min, value));
}

type Option = {
  min: number;
  max: number;
};
