// React Imports
import React from "react";

// MUI Imports
import { Button, Grid, styled } from "@mui/material";
import { Upload, UploadFile } from "@mui/icons-material";

// Assets Imports
import snowVillage from "@/assets/images/snow-village.jpg";

const Img = styled("img")({});

export const UploadPage = () => {
  const [imgURL, setImgURL] = React.useState(snowVillage);

  // File change by URL
  const chgHandler: ChgHandler = (evt) => {
    const files = evt.target.files;
    if (!files?.length) return;

    setImgURL((prev) => {
      URL.revokeObjectURL(prev);
      return URL.createObjectURL(files[0]);
    });
  };

  // File change by file reader
  const fileChgHandler: ChgHandler = async (evt) => {
    const files = evt.target.files;
    if (!files?.length) return;

    const url = await new Promise<string>((res) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (evt) => {
        res(String(evt.target?.result));
      };
    });

    setImgURL(url);
  };

  return (
    <>
      <Grid container spacing={3} p={3}>
        <Grid item xs={12}>
          <Button component="label" variant="contained" startIcon={<Upload />}>
            upload by url
            <input value={""} onChange={chgHandler} hidden type="file" />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            component="label"
            startIcon={<UploadFile />}
            variant="contained"
          >
            upload by file reader
            <input value={""} onChange={fileChgHandler} type="file" hidden />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Img src={imgURL} alt="upload img here" width={400} />
        </Grid>
      </Grid>
    </>
  );
};
type ChgHandler = React.InputHTMLAttributes<HTMLInputElement>["onChange"];
