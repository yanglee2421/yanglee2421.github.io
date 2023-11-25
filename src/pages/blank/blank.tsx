// MUI Imports
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";

// Redux Imports
import { useAppSelector, loadBgImg, setBgImg, useAppDispatch } from "@/redux";
import React from "react";

export function Blank() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((s) => {
    return s.theme.isLoading;
  });
  const bgImg = useAppSelector((s) => {
    return s.theme.bgImg;
  });

  const handleBgImgChange: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >["onChange"] = async (evt) => {
    try {
      const dataURL = await new Promise<string>((res, rej) => {
        const file = evt.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onerror = (evt) => {
            rej(evt.target?.error);
          };
          reader.onload = (evt) => {
            const dataURL = evt.target?.result;
            if (typeof dataURL === "string") {
              res(dataURL);
              return;
            }

            rej(new Error("result is not a string"));
          };
        }
      });
      dispatch(setBgImg(dataURL));
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    dispatch(loadBgImg());
  }, [dispatch]);

  return (
    <>
      <Box
        height={"100%"}
        sx={{
          backgroundImage: `url(${bgImg})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Button component="label">
          <input
            onChange={handleBgImgChange}
            type="file"
            hidden
            accept="image/*"
          />
          upload
        </Button>
      </Box>
      <Backdrop open={isLoading} sx={{ color: "common.white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
