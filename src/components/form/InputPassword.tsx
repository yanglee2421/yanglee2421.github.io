import React from "react";
import type { TextFieldProps } from "@mui/material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { useFormContext, useController } from "react-hook-form";

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
    ></TextField>
  );
}

type Props = TextFieldProps & { field: string };
