import { AddOutlined } from "@mui/icons-material";
import { Divider, useTheme } from "@mui/material";
import React from "react";

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

export const Component = () => {
  const [file, setFile] = React.useState<File | null>(null);

  const theme = useTheme();

  return (
    <div>
      <div>{renderFile(file)}</div>
      <Divider />
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
      <p>Paste your files here to upload</p>
      <textarea
        name=""
        id=""
        onPaste={(e) => {
          const file = e.clipboardData.files.item(0);
          if (file) {
            setFile(file);
          }
        }}
        rows={5}
      ></textarea>
    </div>
  );
};
