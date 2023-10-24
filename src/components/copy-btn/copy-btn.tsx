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

export const CopyBtn = React.forwardRef<HTMLButtonElement, CopyBtnProps>(
  (props, ref) => {
    // ** Props
    const { children, text, ...restProps } = props;

    const [isPending, setIsPending] = React.useState(false);
    const iconEl = React.useMemo(() => {
      if (children) return children;
      if (isPending) return <LibraryAddCheckRounded />;
      return <ContentCopyRounded />;
    }, [isPending, children]);

    const handleClick = async () => {
      if (isPending) return;

      try {
        await navigator.clipboard.writeText(text);
        setIsPending(true);
        await timeout(1000);
        setIsPending(false);
      } catch (error) {
        console.error(error);
        setIsPending(false);
      }
    };

    return (
      <Tooltip title="Copy the source">
        <IconButton ref={ref} onClick={handleClick} {...restProps}>
          {iconEl}
        </IconButton>
      </Tooltip>
    );
  }
);

export interface CopyBtnProps extends IconButtonProps {
  text: string;
}
