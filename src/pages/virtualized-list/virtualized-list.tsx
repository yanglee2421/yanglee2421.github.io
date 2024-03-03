import React from "react";

import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import type { ListChildComponentProps } from "react-window";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import PerfectScrollbar from "perfect-scrollbar";

import "perfect-scrollbar/css/perfect-scrollbar.css";

export function VirtualizedList() {
  const infiniteRef = React.useRef<InfiniteLoader>(null);
  const scrollViewRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const scrollViewEl = scrollViewRef.current?.querySelector(".scrollview");
    if (!scrollViewEl) {
      return;
    }

    const ps = new PerfectScrollbar(scrollViewEl);

    return () => {
      ps.destroy();
    };
  }, []);

  return (
    <Paper>
      <Box
        ref={scrollViewRef}
        sx={{
          height: 420,
          bgcolor: "background.paper",
          "& scrollview": {
            overflow: "hidden !important",
          },
        }}
      >
        <AutoSizer>
          {(size) => {
            return (
              <InfiniteLoader
                ref={infiniteRef}
                isItemLoaded={() => true}
                itemCount={200}
                loadMoreItems={() => {}}
              >
                {({ ref, onItemsRendered }) => {
                  return (
                    <FixedSizeList
                      ref={ref}
                      onItemsRendered={onItemsRendered}
                      height={size.height}
                      width={size.width}
                      itemSize={46}
                      itemCount={200}
                      overscanCount={5}
                      className="scrollview"
                    >
                      {renderRow}
                    </FixedSizeList>
                  );
                }}
              </InfiniteLoader>
            );
          }}
        </AutoSizer>
      </Box>
    </Paper>
  );
}

function renderRow(props: ListChildComponentProps) {
  // ** Props
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText
          primary={`Item ${index + 1}`}
          secondary={`item description...`}
        ></ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
