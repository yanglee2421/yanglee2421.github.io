// Component Imports
import InfiniteScroll from "react-infinite-scroll-component";
import { Scrollbar } from "@/components";

// React Imports
import React from "react";

// MUI Imports
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Skeleton,
  Grid,
  ListItemIcon,
  Button,
} from "@mui/material";
import { FiberManualRecordOutlined } from "@mui/icons-material";

// Utils Imports
import { timeout } from "@/utils";

// API Imports
import { useInfiniteQuery } from "@tanstack/react-query";

export function InfiniteList() {
  const scrollId = React.useId();
  const [count, setCount] = React.useState(0);

  const query = useInfiniteQuery({
    queryKey: ["infinite-query"],
    async queryFn({ pageParam }) {
      await timeout(1000);
      return { id: pageParam.page };
    },
    initialPageParam: { page: 0 },
    getNextPageParam(lastPage, allPages, lastPageParam, allPageParams) {
      void { lastPage, allPages, allPageParams };

      if (lastPageParam.page < 100) {
        return { page: lastPageParam.page + 1 };
      }

      return null;
    },
    getPreviousPageParam(lastPage, allPages, lastPageParam, allPageParams) {
      void { lastPage, allPages, allPageParams };

      if (lastPageParam.page > 0) {
        return { page: lastPageParam.page - 1 };
      }

      return null;
    },
    initialData() {
      const list: { id: number }[] = [];
      for (let i = 0; i < 10; i++) {
        list.push({ id: i });
      }

      return {
        pages: list,
        pageParams: list.map((item) => ({ page: item.id })),
      };
    },
  });

  const nextHandler = async () => {
    query.fetchNextPage();
  };

  const clickHandler = () => {
    setCount((p) => p + 1);
  };

  const listData = React.useMemo(() => {
    const list = query.data?.pages;

    return list?.map((item) => {
      return (
        <ListItemButton key={item.id}>
          <ListItemIcon>
            <FiberManualRecordOutlined />
          </ListItemIcon>
          <ListItemText>item: {item.id}</ListItemText>
        </ListItemButton>
      );
    });
  }, [query.data]);

  return (
    <>
      <Grid container spacing={6} p={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Infinite List"
              action={<Button onClick={clickHandler}>{count}</Button>}
            />
            <CardContent>
              <Box height={420}>
                <Scrollbar id={scrollId}>
                  <InfiniteScroll
                    scrollableTarget={scrollId}
                    dataLength={query.data?.pages.length || 0}
                    hasMore={query.hasNextPage}
                    next={nextHandler}
                    loader={<Loader />}
                    endMessage={<Divider>It is all, nothing more</Divider>}
                  >
                    <List>{listData}</List>
                  </InfiniteScroll>
                </Scrollbar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

function Loader() {
  return (
    <Box>
      <Skeleton />
      <Skeleton animation="wave" />
      {/* <Skeleton animation={false} /> */}
    </Box>
  );
}
