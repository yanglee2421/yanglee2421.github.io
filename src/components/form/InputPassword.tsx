import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import type {
  IconButtonProps,
  InputAdornmentProps,
  TextFieldProps,
} from "@mui/material";

export function InputPassword(props: Props) {
  const {
    iconButtonProps = {},
    inputAdornmentProps = {},
    visibilityIcon = <VisibilityOutlined />,
    visibilityOffIcon = <VisibilityOffOutlined />,
    ...restProps
  } = props;

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" {...inputAdornmentProps}>
            <IconButton
              onClick={() => {
                setShowPassword((p) => !p);
              }}
              {...iconButtonProps}
            >
              {showPassword ? visibilityOffIcon : visibilityIcon}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...restProps}
    />
  );
}

type Props = TextFieldProps & {
  iconButtonProps?: IconButtonProps;
  inputAdornmentProps?: Omit<InputAdornmentProps, "position">;
  visibilityOffIcon?: React.ReactNode;
  visibilityIcon?: React.ReactNode;
};
