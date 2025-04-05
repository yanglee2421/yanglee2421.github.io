import { QRCodeSVG } from "qrcode.react";
import * as consts from "@/lib/constants";

export const Component = () => {
  return (
    <>
      <QRCodeSVG value={consts.GITHUB_URL} />
    </>
  );
};
