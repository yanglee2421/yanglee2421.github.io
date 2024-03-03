import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import { useFormContext, useController } from "react-hook-form";

export function InputText(props: Props) {
  const { field, disabled, ...restProps } = props;

  const formCtx = useFormContext();
  const controller = useController({
    control: formCtx.control,
    name: field,
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

type Props = TextFieldProps & {
  field: string;
};
