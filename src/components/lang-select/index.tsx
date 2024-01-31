// MUI Imports
import {
  Select,
  SelectProps,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

// Router Imports
import { useSearchParams } from "react-router-dom";

export function LangSelect(props: LangSelectProps) {
  // ** Props
  const { required, sx, ...restProps } = props;

  const [searchParams, setSearchParams] = useSearchParams({
    lang: "en",
  });

  return (
    <FormControl fullWidth required={required} sx={sx}>
      <InputLabel>Lang</InputLabel>
      <Select
        value={searchParams.get("lang")}
        onChange={(evt) => {
          setSearchParams((prev) => {
            if (typeof evt.target.value === "string") {
              prev.set("lang", evt.target.value);
            }

            return prev;
          });
        }}
        label="Lang"
        {...restProps}
      >
        {getOptions()}
      </Select>
    </FormControl>
  );
}

function getOptions() {
  return ["zh-CN", "en-US", "fr-FR"].map((item) => {
    return (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  });
}

export interface LangSelectProps extends SelectProps {
  whatever?: unknown;
}
