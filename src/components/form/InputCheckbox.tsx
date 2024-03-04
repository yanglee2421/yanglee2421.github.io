import { Checkbox } from "@mui/material";
import { useFormContext, useController } from "react-hook-form";
import type { CheckboxProps } from "@mui/material";

export function InputCheckbox(props: Props) {
  const { field, value, disabled, ...restProps } = props;

  const formCtx = useFormContext();
  const controller = useController({
    name: field,
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
          toNextValue(checked, value, controller.field.value),
        );
      }}
      {...restProps}
    ></Checkbox>
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

  if (list.includes(value)) {
    return checked ? list : list.filter((el) => !Object.is(el, value));
  }

  return checked ? [...list, value] : list;
}

type Props = CheckboxProps & {
  field: string;
};
