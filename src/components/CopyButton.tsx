// MUI Imports
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import {
  ContentCopyRounded,
  LibraryAddCheckRounded,
} from "@mui/icons-material";

// React Imports
import React from "react";

// Utils Imports
import { timeout } from "@/utils";

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyBtnProps>(
  (props, ref) => {
    // ** Props
    const {
      children = <ContentCopyRounded></ContentCopyRounded>,
      text,
      ...restProps
    } = props;

    const [isPending, setIsPending] = React.useState(false);

    const handleClick = async () => {
      if (isPending) return;

      try {
        await navigator.clipboard.writeText(text);
        setIsPending(true);
        await timeout(1000);
      } catch (error) {
        console.error(error);
      } finally {
        setIsPending(false);
      }
    };

    return (
      <Tooltip title="Copy the source">
        <IconButton ref={ref} onClick={handleClick} {...restProps}>
          {isPending ? (
            <LibraryAddCheckRounded></LibraryAddCheckRounded>
          ) : (
            children
          )}
        </IconButton>
      </Tooltip>
    );
  }
);

export type CopyBtnProps = IconButtonProps & {
  text: string;
};
