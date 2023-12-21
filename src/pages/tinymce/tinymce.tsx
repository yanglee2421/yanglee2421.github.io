// Components Imports
import { TinyMCE } from "@/components/form";

// React Imports
import React from "react";

export function Tinymce() {
  const [html, setHtml] = React.useState("");

  return (
    <>
      <TinyMCE value={html} onEditorChange={setHtml} />
    </>
  );
}
