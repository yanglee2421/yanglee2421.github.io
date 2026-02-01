import QRCode from "qrcode";
import { chunk } from "@/lib/utils";

export const generateMatrix = (value: string) => {
  const unit8Array = QRCode.create(value).modules.data;
  const numbers = Array.from(unit8Array);
  const sqrt = Math.sqrt(numbers.length);

  return chunk(numbers, sqrt);
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

export const transformMatrixIntoPath = (
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

  void { shape, eyePatternGap, gap, eyePatternShape, cellSize, logoSize };
};
