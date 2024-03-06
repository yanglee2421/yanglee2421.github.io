import { CloseOutlined, UploadFileOutlined } from "@mui/icons-material";
import {
  TextField,
  styled,
  Box,
  Typography,
  List,
  Button,
  ListItem,
  IconButton,
  Link,
} from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import uploadPng from "@/assets/images/upload.png";
import { uniqBy } from "@/utils/uniqBy";
import { CardSnippet } from "./CardSnippet";

export function UploadMultipleFiles() {
  const [files, setFiles] = React.useState<File[]>([]);

  const dropzone = useDropzone({
    maxFiles: 3,
    maxSize: 20 * 1024 * 1024,
    // accept: {
    //   "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    // },
    onDrop(acceptedFiles) {
      setFiles(uniqBy(acceptedFiles, { key: "name" }));
    },
    onDropRejected() {
      toast.error("You can only upload 3 files & maximum size of 20 MB.");
    },
  });

  return (
    <CardSnippet
      title={"Upload Multiple Files"}
      collapseContent={
        <TextField fullWidth multiline label="Data URL" minRows={4} />
      }
    >
      <StyledBox {...dropzone.getRootProps()}>
        <input {...dropzone.getInputProps()} />
        <Box
          sx={{
            display: "flex",
            flexDirection: ["column", "column", "row"],
            alignItems: "center",
          }}
        >
          <Img alt="Upload img" src={uploadPng} />
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
              Drop files here or click{" "}
              <Link href="/" onClick={(e) => e.preventDefault()}>
                browse
              </Link>{" "}
              thorough your machine
            </Typography>
          </Box>
        </Box>
      </StyledBox>
      {!!files.length && (
        <>
          <List
            sx={{
              mt: 4.5,
              "& > .MuiListItem-root + .MuiListItem-root": {
                marginTop: 3.5,
              },
            }}
          >
            {files.map((file) => (
              <ListItem
                key={file.name}
                sx={(theme) => {
                  return {
                    display: "flex",
                    justifyContent: "space-between",
                    padding: theme.spacing(2.5, 2.4, 2.5, 6),
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: theme.palette.divider,
                    borderRadius: `${theme.shape.borderRadius}px`,
                  };
                }}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <Box display={"flex"} mr={3.75} fontSize={"2rem"}>
                    {renderFilePreview(file)}
                  </Box>
                  <Box>
                    <Typography fontWeight={600}>{file.name}</Typography>
                    <Typography variant="body2">
                      {Math.round(file.size / 100) / 10 > 1000
                        ? `${(Math.round(file.size / 100) / 10000).toFixed(
                            1,
                          )} mb`
                        : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                    </Typography>
                  </Box>
                </Box>
                <IconButton>
                  <CloseOutlined />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Box display={"flex"} gap={4} justifyContent={"flex-end"} mt={2}>
            <Button
              onClick={() => setFiles([])}
              color="error"
              variant="outlined"
            >
              Remove All
            </Button>
            <Button variant="contained">Upload Files</Button>
          </Box>
        </>
      )}
    </CardSnippet>
  );
}

const StyledBox = styled(Box)({
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",

  padding: "1rem",
  border: "2px dashed rgba(93, 89, 98, 0.22)",
  borderRadius: "6px",
  minHeight: "300px",

  cursor: "pointer",
});

const Img = styled("img")(({ theme }) => ({
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

function renderFilePreview(file: File) {
  if (file.type.startsWith("image")) {
    return (
      <StyledImg
        width={38}
        height={38}
        alt={file.name}
        src={URL.createObjectURL(file)}
        onLoad={(evt) => {
          URL.revokeObjectURL(evt.currentTarget.src);
        }}
      />
    );
  }

  return <UploadFileOutlined fontSize="inherit" />;
}

const StyledImg = styled("img")(({ theme }) => {
  return {
    width: 38,
    height: 38,
    padding: theme.spacing(0.75),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${
      theme.palette.mode === "light"
        ? "rgba(93, 89, 98, 0.14)"
        : "rgba(247, 244, 254, 0.14)"
    }`,
  };
});
