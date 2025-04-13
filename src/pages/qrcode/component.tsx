import { QRCodeSVG } from "qrcode.react";
import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import * as consts from "@/lib/constants";

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
        <Grid container spacing={6}>
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
            />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" color="primary">
              Generate QR Code
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
