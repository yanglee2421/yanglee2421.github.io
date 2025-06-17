import { QRCodeSVG } from "qrcode.react";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import * as consts from "@/lib/constants";
import { QrCode2Outlined } from "@mui/icons-material";
import { readBarcodes } from "zxing-wasm";

const PasteInput = () => {
  const [pasteValue, setPasteValue] = React.useState("");
  const [barcode, setBarcode] = React.useState("");

  return (
    <div
      onDrag={(e) => {
        const file = e.dataTransfer.files.item(0);
        if (!file) return;
        console.log(file);
      }}
    >
      <img
        src={pasteValue}
        onLoad={(e) => {
          URL.revokeObjectURL(e.currentTarget.src);
        }}
        alt=""
      />
      <p>{barcode}</p>
      <input
        type="text"
        onPaste={async (e) => {
          const file = e.clipboardData.files.item(0);
          if (!file) return;
          if (!file.type.startsWith("image/")) {
            alert("Please paste an image file.");
            return;
          }
          const url = URL.createObjectURL(file);
          setPasteValue(url);

          const data = await readBarcodes(file);
          data.forEach((barcode) => {
            if (!barcode.isValid) return;
            setBarcode(barcode.text);
          });
        }}
      />
    </div>
  );
};

export const Component = () => {
  const [qrValue, setQrValue] = React.useState(consts.GITHUB_URL);

  return (
    <Box>
      <form
        action={async (formData) => {
          const qrInput = formData.get("qrInput") as string;
          setQrValue(qrInput);
        }}
      >
        <Grid container spacing={3}>
          <Grid size={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ bgcolor: "white", padding: 3 }}>
                <QRCodeSVG value={qrValue} width={256} height={256} />
              </Box>
            </Box>
          </Grid>
          <Grid size={12}>
            <TextField
              name="qrInput"
              label="Enter QR Code Value"
              variant="outlined"
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit">
                        <QrCode2Outlined />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
                htmlInput: {
                  autoComplete: "off",
                },
              }}
            />
          </Grid>
        </Grid>
      </form>
      <PasteInput />
    </Box>
  );
};
