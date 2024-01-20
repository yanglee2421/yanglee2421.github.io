// Components Imports
import { TinyMce } from "@/components/form";

// React Imports
import React from "react";

export function Tinymce() {
  const [html, setHtml] = React.useState("");

  return (
    <>
      <TinyMce value={html} onEditorChange={setHtml} />
    </>
  );
}
