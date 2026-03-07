import { prepareZXingModule, readBarcodes } from "zxing-wasm";
import zxingWasmPath from "zxing-wasm/full/zxing_full.wasm?url";

prepareZXingModule({
  overrides: {
    locateFile: (path: string, prefix: string) => {
      if (path.endsWith(".wasm")) {
        return new URL(zxingWasmPath, import.meta.url).href;
      }
      return prefix + path;
    },
  },
  fireImmediately: true,
});

const main = async () => {
  self.addEventListener("message", async (event) => {
    const imageBitmap = event.data as ImageBitmap;
    const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(imageBitmap, 0, 0);
    const blob = await canvas.convertToBlob();
    const barcodes = await readBarcodes(blob);
    if (!barcodes.length) return;
    self.postMessage(barcodes);
  });
};

main();
