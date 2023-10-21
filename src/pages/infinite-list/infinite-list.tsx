// Component Imports
import InfiniteScroll from "react-infinite-scroll-component";
import { Scrollbar } from "@/components";

// React Imports
import React from "react";

// MUI Imports
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Skeleton,
} from "@mui/material";

export function InfiniteList() {
  const scrollId = React.useId();
  const [count, setCount] = React.useState(20);
  const listData = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(i);
    }

    return list.map((item) => {
      return (
        <ListItemButton key={item}>
          <ListItemText>{item}</ListItemText>
        </ListItemButton>
      );
    });
  }, [count]);

  const nextHandler = async () => {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    setCount((p) => p + 5);
  };

  return (
    <>
      <Box height={420}>
        <Scrollbar id={scrollId}>
          <InfiniteScroll
            scrollableTarget={scrollId}
            dataLength={count}
            hasMore={count < 100}
            next={nextHandler}
            loader={<Loader />}
            endMessage={<Divider>It is all, nothing more</Divider>}
          >
            <List>{listData}</List>
          </InfiniteScroll>
        </Scrollbar>
      </Box>
    </>
  );
}

function Loader() {
  return (
    <Box padding={3}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
