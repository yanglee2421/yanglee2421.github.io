// MUI Imports
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

// React Imports
import React from "react";

export function ItemPasswd(props: ItemPasswdProps) {
  // ** Props
  const { name, label, disabled, required, sx, ...restProps } = props;

  // Form Hooks
  const formCtx = useFormContext();
  const controller = useController({
    name,
    control: formCtx.control,
    defaultValue: "",
    disabled,
  });

  // Show Password
  const [showPasswd, setIsShowPasswd] = React.useState(false);

  return (
    <FormControl fullWidth error={!!controller.fieldState.error} sx={sx}>
      <InputLabel required>{label}</InputLabel>
      <OutlinedInput
        {...controller.field}
        type={showPasswd ? "text" : "password"}
        label={label}
        required={required}
        endAdornment={
          <ToggleIcon
            value={showPasswd}
            onChange={setIsShowPasswd}
          ></ToggleIcon>
        }
        {...restProps}
      />
      {controller.fieldState.error && (
        <FormHelperText>{controller.fieldState.error.message}</FormHelperText>
      )}
    </FormControl>
  );
}

export type ItemPasswdProps = OutlinedInputProps & { name: string };

function ToggleIcon(props: ToggleIconProps) {
  // ** Props
  const { value, onChange } = props;

  // ** Change
  const handleClick = () => onChange(!value);

  return (
    <InputAdornment position="end">
      <IconButton onClick={handleClick}>
        {value ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
      </IconButton>
    </InputAdornment>
  );
}

interface ToggleIconProps {
  value: boolean;
  onChange(v: boolean): void;
}
