// MUI Imports
import { Select, MenuItem, SelectProps, InputAdornment } from "@mui/material";
import { CalendarMonthOutlined } from "@mui/icons-material";

export function DateSelect(props: SelectProps) {
  // ** Props
  const { ...restProps } = props;

  const optionsNode = Array.from(optionsMap.entries(), ([key, value]) => {
    const unique = JSON.stringify(value);

    return (
      <MenuItem key={unique} value={unique}>
        {key}
      </MenuItem>
    );
  });

  return (
    <>
      <Select
        size="small"
        startAdornment={
          <InputAdornment position="start">
            <CalendarMonthOutlined />
          </InputAdornment>
        }
        {...restProps}
      >
        {optionsNode}
      </Select>
    </>
  );
}

const optionsMap = new Map<string, Value>();
optionsMap.set("Today", {
  date_from: "dStart",
});
optionsMap.set("Yesterday", {
  date_to: "-1dEnd",
  date_from: "-1dStart",
});
optionsMap.set("Last 24 hours", {
  date_from: "-24h",
});
optionsMap.set("Last 7 days", {
  date_from: "-7d",
});
optionsMap.set("Last 14 days", {
  date_from: "-14d",
});
optionsMap.set("Last 30 days", {
  date_from: "-30d",
});
optionsMap.set("Last 90 days", {
  date_from: "-90d",
});
optionsMap.set("Last 180 days", {
  date_from: "-180d",
});
optionsMap.set("This month", {
  date_from: "mStart",
});
optionsMap.set("Year to date", {
  date_from: "yStart",
});
optionsMap.set("All time", {
  date_from: "all",
});

interface Value {
  date_to?: string;
  date_from?: string;
}
