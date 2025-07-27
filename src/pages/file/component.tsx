import { AddOutlined } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  LinearProgress,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import * as pdfjs from "pdfjs-dist";
import { readBarcodes, prepareZXingModule } from "zxing-wasm/reader";
import wasmURL from "zxing-wasm/reader/zxing_reader.wasm?url";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import { queryOptions, useQueries, useQuery } from "@tanstack/react-query";

prepareZXingModule({
  overrides: {
    locateFile(path: string, prefix: string) {
      if (path.endsWith(".wasm")) {
        return new URL(wasmURL, import.meta.url).href;
      }
      return prefix + path;
    },
  },
});
pdfjs.GlobalWorkerOptions.workerSrc = new URL(pdfWorker, import.meta.url).href;

const pdfToImageBlob = async (file: File, pageIndex = 1) => {
  const buf = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: buf }).promise;
  const page = await doc.getPage(pageIndex);
  const viewport = page.getViewport({ scale: 1 });
  const outputScale = devicePixelRatio || 1;
  const canvas = document.createElement("canvas");
  const canvasContext = canvas.getContext("2d");
  if (!canvasContext) throw new Error("get canvas context failed");

  canvas.width = Math.floor(viewport.width * outputScale);
  canvas.height = Math.floor(viewport.height * outputScale);

  await page.render({
    viewport,
    canvasContext,
    transform: Object.is(outputScale, 1)
      ? void 0
      : [outputScale, 0, 0, outputScale, 0, 0],
  }).promise;

  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error("get blob from canvas failed");
      }
      resolve(blob);
    });
  });

  return blob;
};

const renderFile = (file: File | null) => {
  if (!file) {
    return <p>No file selected.</p>;
  }

  if (file.type.startsWith("image/")) {
    return (
      <img
        src={URL.createObjectURL(file)}
        onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
        alt="Selected file"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    );
  }

  if (file.type.startsWith("video/")) {
    return (
      <video controls>
        <source src={URL.createObjectURL(file)} type={file.type} />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (file.type.startsWith("audio/")) {
    return (
      <audio controls>
        <source src={URL.createObjectURL(file)} type={file.type} />
        Your browser does not support the audio element.
      </audio>
    );
  }

  return <p>File type not supported for preview: {file.type}</p>;
};

const fetchBarcodeText = (file: File) =>
  queryOptions({
    queryKey: [
      "pdf demo",
      [file.lastModified, file.name, file.size, file.type],
    ],
    async queryFn() {
      const blob = await pdfToImageBlob(file);
      const barcodes = await readBarcodes(blob);
      return barcodes.map((i) => i.text);
    },
  });

type BarcodeTextProps = {
  file: File;
};

const BarcodeText = (props: BarcodeTextProps) => {
  const query = useQuery(fetchBarcodeText(props.file));

  if (query.isPending) {
    return <p>loading...</p>;
  }

  if (query.isError) {
    return <p>{query.error.message}</p>;
  }

  return (
    <>
      {query.data.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </>
  );
};

export const Component = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [files, setFiles] = React.useState<File[]>([]);

  const theme = useTheme();

  return (
    <Stack spacing={1.5}>
      <Card>
        <CardHeader title={"Extract QRCode from pdf"} />
        <CardContent>
          <Grid container spacing={1.5}>
            <Grid size={12}>
              <div>{renderFile(file)}</div>
            </Grid>
            <Grid size={12}>
              <Divider />
            </Grid>
            <Grid size={12}>
              <label
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files.item(0);
                  if (file) {
                    setFile(file);
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "3rem",
                  border: "2px dashed",
                  borderColor: theme.palette.divider,

                  cursor: "pointer",
                }}
              >
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.item(0);
                    if (file) {
                      setFile(file);
                    }
                  }}
                  style={{ display: "none" }}
                />
                <AddOutlined fontSize="large" />
              </label>
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <FormLabel>Paste your files here to upload</FormLabel>
                <TextField
                  onPaste={(e) => {
                    const file = e.clipboardData.files.item(0);
                    if (file) {
                      setFile(file);
                    }
                  }}
                  rows={5}
                  placeholder="Paste any file here"
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid size={12}>
              <Divider />
            </Grid>
            <Grid size={12}>
              <div>
                <TextField
                  onPaste={async (e) => {
                    const fileList = [...e.clipboardData.files];
                    setFiles(fileList);
                  }}
                  placeholder="Paste pdf file here"
                  style={{ width: "100%", resize: "vertical" }}
                />
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>
                      <BarcodeText file={file} />
                    </li>
                  ))}
                </ul>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <CalculatePDF />
    </Stack>
  );
};

const CalculatePDF = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const queries = useQueries({
    queries: files.map((file) => fetchBarcodeText(file)),
  });

  const isFetching = queries.some((query) => query.isFetching);

  return (
    <Card>
      <CardHeader title={"Calculate"} />
      <CardContent>
        <TextField
          fullWidth
          multiline
          minRows={2}
          onDrop={(e) => {
            e.preventDefault();
            const files = [...e.dataTransfer.files];
            setFiles(files);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onPaste={(e) => {
            const files = [...e.clipboardData.files];
            setFiles(files);
          }}
        />
      </CardContent>
      {isFetching && <LinearProgress />}
      <ol>
        {queries.map((query) =>
          query.data?.map((barcode) => <li key={barcode}>{barcode}</li>),
        )}
      </ol>
      <CardActions></CardActions>
    </Card>
  );
};
