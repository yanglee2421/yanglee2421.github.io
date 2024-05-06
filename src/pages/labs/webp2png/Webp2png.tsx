import { DownloadOutlined, UploadFileOutlined } from "@mui/icons-material";
import { Card, CardHeader, CardContent, Button, Box } from "@mui/material";
import { fabric } from "fabric";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useImmer } from "use-immer";

export function Webp2png() {
  const [state, updateState] = useImmer<{
    file: null | File;
  }>({
    file: null,
  });

  const dropzone = useDropzone({
    onDrop(acceptedFiles) {
      const file = acceptedFiles[0];

      if (file instanceof File) {
        updateState((state) => {
          state.file = file;
        });
      }
    },
    onDropRejected(fileRejections) {
      toast.warn(fileRejections[0].errors[0].message);
    },
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <Card>
      <CardHeader
        title="Upload Single Files"
        subheader="Drop files here or click to upload"
        action={
          !!state.file && (
            <Button
              onClick={async () => {
                if (!(state.file instanceof File)) {
                  return;
                }

                const canvas = new fabric.StaticCanvas(null);
                const fileHref = URL.createObjectURL(state.file);
                const img = await new Promise<fabric.Image>((resolve) => {
                  fabric.Image.fromURL(fileHref, resolve);
                });

                URL.revokeObjectURL(fileHref);

                if (typeof img.width === "number") {
                  canvas.setWidth(img.width);
                }

                if (typeof img.height === "number") {
                  canvas.setHeight(img.height);
                }

                canvas.add(img);

                const a = document.createElement("a");
                a.download = `${Date.now()}.png`;
                a.href = canvas.toDataURL();
                a.click();
                a.remove();
              }}
              startIcon={<DownloadOutlined />}
              variant="outlined"
            >
              download
            </Button>
          )
        }
      />
      <CardContent>
        <Box
          {...dropzone.getRootProps()}
          height={400}
          border={(theme) => `2px dashed ${theme.palette.divider}`}
          fontSize={64}
          color={(theme) => theme.palette.text.secondary}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <input {...dropzone.getInputProps()} />
          {state.file ? (
            <img
              src={URL.createObjectURL(state.file)}
              onLoad={(evt) => {
                URL.revokeObjectURL(evt.currentTarget.src);
              }}
              alt="upload file"
              height={360}
            />
          ) : (
            <UploadFileOutlined fontSize="inherit" color="inherit" />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
