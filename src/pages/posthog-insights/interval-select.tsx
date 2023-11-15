// MUI Imports
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";

export function IntervalSelect(props: SelectProps) {
  // ** Props
  const { ...restProps } = props;

  const optionsNode = Array.from(intervalMap.entries(), ([key, value]) => {
    return (
      <MenuItem key={key} value={value}>
        {key}
      </MenuItem>
    );
  });

  return (
    <>
      <FormControl>
        <InputLabel>grouped by</InputLabel>
        <Select
          label="grouped by"
          size="small"
          sx={{
            "& .MuiSelect-select": {
              minWidth: "6rem",
            },
          }}
          {...restProps}
        >
          {optionsNode}
        </Select>
      </FormControl>
    </>
  );
}

const intervalMap = new Map<string, string>();
intervalMap.set("hour", "hour");
intervalMap.set("day", "day");
intervalMap.set("week", "week");
intervalMap.set("month", "month");
