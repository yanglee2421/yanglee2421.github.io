// MUI Imports
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

export function IntInput(props: IntInputProps) {
  // ** Props
  const { disabled, name, ...restProps } = props;

  const formCtx = useFormContext();
  const controller = useController({
    control: formCtx.control,
    name,
    disabled,
    defaultValue: null,
  });

  const handleAdd = () => {
    const fieldValue = controller.field.value;

    if (typeof fieldValue === "number") {
      controller.field.onChange(fieldValue + 1);

      return;
    }

    controller.field.onChange(1);
  };
  const handleRemove = () => {
    if (controller.field.value) {
      controller.field.onChange(controller.field.value - 1);
    }
  };

  return (
    <TextField
      value={
        typeof controller.field.value === "number" ? controller.field.value : ""
      }
      onChange={(evt) => {
        const stringValue = evt.target.value.replace(/\D/g, "");

        if (stringValue) {
          controller.field.onChange(Number.parseInt(stringValue));

          return;
        }

        controller.field.onChange(null);
      }}
      onKeyDown={(evt) => {
        switch (evt.key) {
          case "ArrowUp":
            evt.preventDefault();
            handleAdd();
            break;
          case "ArrowDown":
            evt.preventDefault();
            handleRemove();
            break;
          default:
            return;
        }
      }}
      error={!!controller.fieldState.error}
      helperText={controller.fieldState.error?.message}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={handleRemove} size="small">
              <RemoveOutlined fontSize="small"></RemoveOutlined>
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleAdd} size="small">
              <AddOutlined fontSize="small"></AddOutlined>
            </IconButton>
          </InputAdornment>
        ),
      }}
      type="text"
      inputMode="numeric"
      {...restProps}
    ></TextField>
  );
}

export type IntInputProps = TextFieldProps & {
  name: string;
};
