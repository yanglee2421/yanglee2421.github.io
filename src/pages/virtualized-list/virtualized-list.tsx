// MUI Imports
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
} from "@mui/material";

// Components Imports
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";

// React Imports
import React from "react";

export function VirtualizedList() {
  const infiniteRef = React.useRef<InfiniteLoader>(null);

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <Box
            sx={{
              height: 420,
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
        </Grid>
        <Grid xs={12} md={6}>
          <InfiniteLoader
            ref={infiniteRef}
            isItemLoaded={() => true}
            itemCount={200}
            loadMoreItems={() => {}}
          >
            {({ onItemsRendered, ref }) => {
              return (
                <FixedSizeList
                  ref={ref}
                  itemCount={200}
                  onItemsRendered={onItemsRendered}
                  height={520}
                  width={400}
                  itemSize={46}
                >
                  {renderRow}
                </FixedSizeList>
              );
            }}
          </InfiniteLoader>
        </Grid>
      </Grid>
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
