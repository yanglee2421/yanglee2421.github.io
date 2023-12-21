// MUI Imports
import { Checkbox, CheckboxProps } from "@mui/material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

export function ItemCheckbox(props: ItemCheckboxProps) {
  // ** Props
  const { name, value, disabled, ...restProps } = props;

  // Form Field
  const formCtx = useFormContext();
  const controller = useController({
    name,
    control: formCtx.control,
    defaultValue: false,
    disabled,
  });

  return (
    <Checkbox
      {...controller.field}
      checked={toChecked(value, controller.field.value)}
      onChange={(evt, checked) => {
        void evt;
        controller.field.onChange(
          toNextValue(checked, value, controller.field.value)
        );
      }}
      {...restProps}
    />
  );
}

function toChecked(value: unknown, fieldValue: unknown) {
  if (typeof value === "undefined") {
    return Boolean(fieldValue);
  }

  const list = toList(fieldValue);
  return list.includes(value);
}

function toList(fieldValue: unknown) {
  if (Array.isArray(fieldValue)) {
    return fieldValue;
  }

  return [];
}

function toNextValue(checked: boolean, value: unknown, fieldValue: unknown) {
  if (typeof value === "undefined") {
    return checked;
  }

  const list = toList(fieldValue);

  // The current value is already in the array
  if (list.includes(value)) {
    return checked ? list : list.filter((el) => !Object.is(el, value));
  }

  // The array does not contain the current value
  return checked ? [...list, value] : list;
}

export type ItemCheckboxProps = CheckboxProps & {
  name: string;
};
