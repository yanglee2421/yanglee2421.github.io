import { styled } from "@mui/material";
import { createPortal } from "react-dom";

const StyledP = styled("p")({
  margin: 0,

  fontSize: "12pt",
  textAlign: "end",
});

export const Component = () => {
  return (
    <>
      {createPortal(
        <article data-print-container>
          <section data-a4>
            <StyledP>轮货统-503</StyledP>
            <h1>季度校验</h1>
            <StyledP>第 1 页</StyledP>
          </section>
        </article>,
        document.body,
      )}
    </>
  );
};
