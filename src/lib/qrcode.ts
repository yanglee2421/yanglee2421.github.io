import QRCode from "qrcode";

const generateMatrix = (value: string) => {
  const unit8Array = QRCode.create(value).modules.data;
  const numbers = Array.from(unit8Array);
  const sqrt = Math.sqrt(numbers.length);
  const result: number[][] = [];

  return numbers.reduce((rows, number) => {
    const lastRow = rows.at(-1) || [];

    if (!rows.includes(lastRow)) {
      rows.push(lastRow);
    }

    if (lastRow.length < sqrt) {
      lastRow.push(number);
    }

    return rows;
  }, result);
};

type BaseShapeOptions =
  | "square"
  | "circle"
  | "rounded"
  | "diamond"
  | "triangle"
  | "star";

type ShapeOptions = {
  shape?: BaseShapeOptions;
  eyePatternShape?: BaseShapeOptions;
  gap?: number;
  eyePatternGap?: number;
};

const transformMatrixIntoPath = (
  matrix: number[][],
  size: number,
  options: ShapeOptions = {},
  logoSize: number = 0,
) => {
  const {
    shape = "rounded",
    eyePatternShape = "rounded",
    gap = 0,
    eyePatternGap = 0,
  } = options;

  const cellSize = size / matrix.length;
};
