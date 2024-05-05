import decimal from "decimal.js";

export function Decimal() {
  console.log({
    a: decimal.add(0.1, 0.2).toString(),
    b: decimal.sub(0.3, 0.2).toString(),
    c: decimal.mul(0.5, 0.5).toString(),
    d: decimal.div(0.1, 0.1).toString(),
  });

  return null;
}
