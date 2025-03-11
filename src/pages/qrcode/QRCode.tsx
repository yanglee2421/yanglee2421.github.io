import { QRCodeSVG } from "qrcode.react";
import * as consts from "@/lib/constants";

export const QRCode = () => {
  return (
    <>
      <QRCodeSVG value={consts.GITHUB_URL} />
    </>
  );
};
