import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useFormContext, useController } from "react-hook-form";
import type { TextFieldProps } from "@mui/material";

export function InputPassword(props: Props) {
  const { field, disabled, ...restProps } = props;

  const formCtx = useFormContext();

  const controller = useController({
    name: field,
    control: formCtx.control,
    defaultValue: "",
    disabled,
  });

  const [showPasswd, setIsShowPasswd] = React.useState(false);

  return (
    <TextField
      {...controller.field}
      error={!!controller.fieldState.error}
      helperText={controller.fieldState.error?.message}
      type={showPasswd ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setIsShowPasswd((p) => !p);
              }}
            >
              {showPasswd ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      inputProps={{ inputMode: "text" }}
      fullWidth
      {...restProps}
    />
  );
}

type Props = TextFieldProps & { field: string };
