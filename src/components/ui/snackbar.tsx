import React from "react";
import { SnackbarProvider as NotistackProvider, useSnackbar } from "notistack";
import type { CustomContentProps, SnackbarProviderProps } from "notistack";
import { IconButton, SnackbarContent } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

type CustomSnackbarProps = CustomContentProps & {
  ref?: React.Ref<HTMLDivElement>;
};

const CustomSnackbar = (props: CustomSnackbarProps) => {
  const {
    id,
    message,
    iconVariant,
    hideIconVariant,
    action,
    anchorOrigin,
    autoHideDuration,
    persist,
    variant,
    ...rest
  } = props;

  const snackbar = useSnackbar();

  const renderAction = () => {
    if (!action) {
      return (
        <IconButton
          onClick={() => {
            snackbar.closeSnackbar(id);
          }}
          color="inherit"
        >
          <CloseOutlined />
        </IconButton>
      );
    }

    if (typeof action === "function") {
      return action(id);
    }

    return action;
  };

  return (
    <div role="alert" {...rest}>
      <SnackbarContent message={message} action={renderAction()} />
    </div>
  );
};

export const SnackbarProvider = (props: SnackbarProviderProps) => {
  return (
    <NotistackProvider
      {...props}
      Components={{
        default: CustomSnackbar,
      }}
    >
      {props.children}
    </NotistackProvider>
  );
};
