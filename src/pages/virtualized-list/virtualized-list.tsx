// MUI Imports
import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material";

// Components Imports
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export function VirtualizedList() {
  return (
    <>
      <Box
        sx={{
          width: 360,
          height: 520,
          bgcolor: "background.paper",
        }}
      >
        <AutoSizer>
          {(size) => {
            return (
              <FixedSizeList
                height={size.height}
                width={size.width}
                itemSize={46}
                itemCount={200}
                overscanCount={5}
              >
                {renderRow}
              </FixedSizeList>
            );
          }}
        </AutoSizer>
      </Box>
    </>
  );
}

function renderRow(props: ListChildComponentProps) {
  // ** Props
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}
