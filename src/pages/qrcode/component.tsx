import { QRCodeSVG } from "qrcode.react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import * as consts from "@/lib/constants";
import { QrCode2Outlined } from "@mui/icons-material";
import { readBarcodes } from "zxing-wasm";

const PasteInput = () => {
  const [pasteValue, setPasteValue] = React.useState("");
  const [barcode, setBarcode] = React.useState("");

  const handlePaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
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
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const file = e.dataTransfer.files.item(0);
    if (!file) return;
    console.log(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Stack spacing={1.5}>
      <TextField
        fullWidth
        onPaste={handlePaste}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      />
      <div>
        <img
          src={pasteValue}
          onLoad={(e) => {
            URL.revokeObjectURL(e.currentTarget.src);
          }}
          alt=""
        />
        <p>{barcode}</p>
      </div>
    </Stack>
  );
};

export const Component = () => {
  const [qrValue, setQrValue] = React.useState(consts.GITHUB_URL);

  return (
    <Stack spacing={3}>
      <Card>
        <CardHeader title="Generate QRCode from text" />
        <CardContent>
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
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Read QRCode from image" />
        <CardContent>
          <PasteInput />
        </CardContent>
      </Card>
    </Stack>
  );
};
