// MUI Imports
import { TextField, TextFieldProps } from "@mui/material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

export function IntInput(props: IntInputProps) {
  // ** Props
  const { disabled, name, ...restProps } = props;

  const formCtx = useFormContext();
  const controller = useController({
    control: formCtx.control,
    name,
    defaultValue: null,
    disabled,
  });

  return (
    <TextField
      value={(() => {
        if (controller.field.value === null) {
          return "";
        }

        return controller.field.value;
      })()}
      onChange={(evt) => {
        const stringValue = evt.target.value.replace(/\D/g, "");

        if (stringValue) {
          controller.field.onChange(Number.parseInt(stringValue));

          return;
        }

        controller.field.onChange(null);
      }}
      error={!!controller.fieldState.error}
      helperText={controller.fieldState.error?.message}
      fullWidth
      type="number"
      {...restProps}
    ></TextField>
  );
}

export type IntInputProps = TextFieldProps & {
  name: string;
};
