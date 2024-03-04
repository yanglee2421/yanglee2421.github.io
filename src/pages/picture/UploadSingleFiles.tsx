import { TextField, styled, Box, Typography } from "@mui/material";
import imageCompression from "browser-image-compression";
import React from "react";
import { useDropzone } from "react-dropzone";
import uploadPng from "@/assets/images/upload.png";
import { uniqBy } from "@/utils/uniqBy";
import { CardSnippet } from "./CardSnippet";

export function UploadSingleFiles() {
  const [dataURL, setDataURL] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);

  const dropzone = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    async onDrop(acceptedFiles) {
      setFiles(uniqBy(acceptedFiles, { key: "name" }));
      const file = acceptedFiles.at(0);
      if (!file) return;

      const dataURL = await imageCompression.getDataUrlFromFile(file);
      setDataURL(dataURL);

      imageCompression.getFilefromDataUrl;
    },
  });

  const imgNode = files.map((file) => (
    <StyledSingleImg
      key={file.name}
      alt={file.name}
      src={URL.createObjectURL(file)}
      onLoad={(evt) => {
        URL.revokeObjectURL(evt.currentTarget.src);
      }}
    />
  ));

  return (
    <CardSnippet
      title="Upload Single Files"
      collapseContent={
        <TextField
          value={dataURL}
          onChange={() => {}}
          label="Data URL"
          fullWidth
          multiline
          minRows={4}
          maxRows={16}
          InputProps={{ readOnly: true }}
        ></TextField>
      }
    >
      <StyledBox {...dropzone.getRootProps()}>
        <input {...dropzone.getInputProps()} />
        {files.length ? (
          imgNode
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: ["column", "column", "row"],
              alignItems: "center",
            }}
          >
            <StyledImg alt="Upload img" src={uploadPng} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: ["center", "center", "inherit"],
              }}
            >
              <HeadingTypography variant="h5">
                Drop files here or click to upload.
              </HeadingTypography>
              <Typography
                color="textSecondary"
                sx={{
                  "& a": { color: "primary.main", textDecoration: "none" },
                }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif Max 3 files and max size of
                20 MB
              </Typography>
            </Box>
          </Box>
        )}
      </StyledBox>
    </CardSnippet>
  );
}

const StyledBox = styled(Box)({
  minHeight: "300px",
  display: "flex",
  flexWrap: "wrap",
  cursor: "pointer",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  borderRadius: "6px",
  border: "2px dashed rgba(93, 89, 98, 0.22)",
});

const StyledImg = styled("img")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    marginRight: theme.spacing(15.75),
  },
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down("sm")]: {
    width: 160,
  },
}));

const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(4),
  },
}));

const StyledSingleImg = styled("img")(({ theme }) => {
  return {
    objectFit: "cover",
    position: "absolute",
    width: "calc(100% - 1rem)",
    height: "calc(100% - 1rem)",
    borderRadius: theme.shape.borderRadius,
  };
});
