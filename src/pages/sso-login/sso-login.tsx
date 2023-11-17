// React Imports
import React from "react";

// MUI Imports
import {
  Backdrop,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  TextField,
  TextFieldProps,
} from "@mui/material";

export function SsoLogin() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [iframeURL, setIframeURL] = React.useState("http://localhost:5500");
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  void setIframeURL;
  const handleTextChange: TextFieldProps["onChange"] = (evt) => {
    setText(evt.target.value);

    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ msg: evt.target.value }),
      iframeURL,
      []
    );
  };

  React.useEffect(() => {
    const controller = new AbortController();
    iframeRef.current?.addEventListener(
      "load",
      () => {
        setLoading(false);
      },
      {
        signal: controller.signal,
      }
    );

    return () => {
      new AbortController();
    };
  }, [iframeRef, setLoading]);

  return (
    <>
      <Grid container spacing={6} p={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Form" />
            <CardContent>
              <TextField
                value={text}
                onChange={handleTextChange}
                disabled={loading}
                label="Text"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Iframe" />
            <CardContent>
              <Box
                position={"relative"}
                p={3}
                border={"1px solid"}
                borderColor={(theme) => theme.palette.divider}
              >
                <Backdrop open={loading} sx={{ position: "absolute" }}>
                  <CircularProgress />
                </Backdrop>

                <iframe ref={iframeRef} src={iframeURL}></iframe>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
