import React from "react";
import { SnackbarProvider as NotistackProvider, useSnackbar } from "notistack";
import type { CustomContentProps, SnackbarProviderProps } from "notistack";
import { Box, IconButton, SnackbarContent } from "@mui/material";
import {
  Cancel,
  CheckCircle,
  CloseOutlined,
  Info,
  Warning,
} from "@mui/icons-material";

type CustomSnackbarProps = CustomContentProps & {
  ref?: React.Ref<HTMLDivElement>;
};

const CustomSnackbar = (props: CustomSnackbarProps) => {
  const { id, message, action, ...rest } = props;

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
    <div
      role="alert"
      style={rest.style}
      className={rest.className}
      ref={(el) => {
        if (typeof rest.ref === "function") {
          rest.ref(el);
        } else if (rest.ref) {
          rest.ref.current = el;
        }
      }}
    >
      <SnackbarContent message={message} action={renderAction()} />
    </div>
  );
};

const SuccessSnackbar = (props: CustomSnackbarProps) => {
  const {
    message,

    action,

    ...rest
  } = props;

  const snackbar = useSnackbar();

  const renderAction = () => {
    if (!action) {
      return (
        <IconButton
          onClick={() => {
            snackbar.closeSnackbar(props.id);
          }}
          color="inherit"
        >
          <CloseOutlined />
        </IconButton>
      );
    }

    if (typeof action === "function") {
      return action(props.id);
    }

    return action;
  };

  return (
    <div
      role="alert"
      style={rest.style}
      className={rest.className}
      ref={(el) => {
        if (typeof rest.ref === "function") {
          rest.ref(el);
        } else if (rest.ref) {
          rest.ref.current = el;
        }
      }}
    >
      <SnackbarContent
        message={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <CheckCircle fontSize="small" />
            {message}
          </Box>
        }
        action={renderAction()}
        color="success"
        sx={{
          backgroundColor: (theme) => theme.palette.success.main,
          "& .MuiSnackbarContent-message": {
            color: (theme) => theme.palette.success.contrastText,
          },
        }}
      />
    </div>
  );
};

const ErrorSnackbar = (props: CustomSnackbarProps) => {
  const {
    message,

    action,

    ...rest
  } = props;

  const snackbar = useSnackbar();

  const renderAction = () => {
    if (!action) {
      return (
        <IconButton
          onClick={() => {
            snackbar.closeSnackbar(props.id);
          }}
          color="inherit"
        >
          <CloseOutlined />
        </IconButton>
      );
    }

    if (typeof action === "function") {
      return action(props.id);
    }

    return action;
  };

  return (
    <div
      role="alert"
      style={rest.style}
      className={rest.className}
      ref={(el) => {
        if (typeof rest.ref === "function") {
          rest.ref(el);
        } else if (rest.ref) {
          rest.ref.current = el;
        }
      }}
    >
      <SnackbarContent
        message={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Cancel fontSize="small" />
            {message}
          </Box>
        }
        action={renderAction()}
        color="error"
        sx={{
          backgroundColor: (theme) => theme.palette.error.main,
          "& .MuiSnackbarContent-message": {
            color: (theme) => theme.palette.error.contrastText,
          },
        }}
      />
    </div>
  );
};

const WarningSnackbar = (props: CustomSnackbarProps) => {
  const { message, action, ...rest } = props;

  const snackbar = useSnackbar();

  const renderAction = () => {
    if (!action) {
      return (
        <IconButton
          onClick={() => {
            snackbar.closeSnackbar(props.id);
          }}
          color="inherit"
        >
          <CloseOutlined />
        </IconButton>
      );
    }

    if (typeof action === "function") {
      return action(props.id);
    }

    return action;
  };

  return (
    <div
      role="alert"
      style={rest.style}
      className={rest.className}
      ref={(el) => {
        if (typeof rest.ref === "function") {
          rest.ref(el);
        } else if (rest.ref) {
          rest.ref.current = el;
        }
      }}
    >
      <SnackbarContent
        message={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Warning fontSize="small" />
            {message}
          </Box>
        }
        action={renderAction()}
        color="warning"
        sx={{
          backgroundColor: (theme) => theme.palette.warning.main,
          "& .MuiSnackbarContent-message": {
            color: (theme) => theme.palette.warning.contrastText,
          },
        }}
      />
    </div>
  );
};

const InfoSnackbar = (props: CustomSnackbarProps) => {
  const { message, action, ...rest } = props;

  const snackbar = useSnackbar();

  const renderAction = () => {
    if (!action) {
      return (
        <IconButton
          onClick={() => {
            snackbar.closeSnackbar(props.id);
          }}
          color="inherit"
        >
          <CloseOutlined />
        </IconButton>
      );
    }

    if (typeof action === "function") {
      return action(props.id);
    }

    return action;
  };

  return (
    <div
      role="alert"
      style={rest.style}
      className={rest.className}
      ref={(el) => {
        if (typeof rest.ref === "function") {
          rest.ref(el);
        } else if (rest.ref) {
          rest.ref.current = el;
        }
      }}
    >
      <SnackbarContent
        message={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Info fontSize="small" />
            {message}
          </Box>
        }
        action={renderAction()}
        color="info"
        sx={{
          backgroundColor: (theme) => theme.palette.info.main,
          "& .MuiSnackbarContent-message": {
            color: (theme) => theme.palette.info.contrastText,
          },
        }}
      />
    </div>
  );
};

export const SnackbarProvider = (props: SnackbarProviderProps) => {
  return (
    <NotistackProvider
      style={props.style}
      className={props.className}
      ref={(el) => {
        if (typeof props.ref === "function") {
          props.ref(el);
        } else if (props.ref) {
          props.ref.current = el;
        }
      }}
      Components={{
        default: CustomSnackbar,
        success: SuccessSnackbar,
        error: ErrorSnackbar,
        warning: WarningSnackbar,
        info: InfoSnackbar,
      }}
    >
      {props.children}
    </NotistackProvider>
  );
};
