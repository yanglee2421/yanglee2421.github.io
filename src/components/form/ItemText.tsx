// MUI Imports
import { TextField, TextFieldProps } from "@mui/material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

export function ItemText(props: ItemTextProps) {
  // ** Props
  const { name, disabled, ...restProps } = props;

  const formCtx = useFormContext();
  const controller = useController({
    control: formCtx.control,
    name,
    defaultValue: "",
    disabled,
  });

  return (
    <TextField
      {...controller.field}
      error={!!controller.fieldState.error}
      helperText={controller.fieldState.error?.message}
      fullWidth
      {...restProps}
    ></TextField>
  );
}

export type ItemTextProps = TextFieldProps & {
  name: string;
};
