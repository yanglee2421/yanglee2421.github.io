import { Switch } from "@mui/material";
import { useFormContext, useController } from "react-hook-form";
import type { SwitchProps } from "@mui/material";

export function InputSwitch(props: Props) {
  const { field, disabled, ...restProps } = props;

  const formCtx = useFormContext();
  const controller = useController({
    control: formCtx.control,
    name: field,
    disabled,
    defaultValue: false,
  });

  return (
    <Switch
      {...controller.field}
      checked={controller.field.value}
      onChange={(evt, checked) => {
        void evt;

        controller.field.onChange(checked);
      }}
      {...restProps}
    ></Switch>
  );
}

type Props = SwitchProps & {
  field: string;
};
