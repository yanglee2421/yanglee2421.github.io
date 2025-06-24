import { ScrollView } from "@/components/scrollbar";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Link,
  styled,
} from "@mui/material";
import { useVirtualizer, elementScroll } from "@tanstack/react-virtual";
import React from "react";
import type { VirtualizerOptions } from "@tanstack/react-virtual";

const StyledItemDiv = styled("div")({
  height: 340,
  border: "1px solid #ccc",
  padding: 12,
});

const easeInOutQuint = (t: number) => {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
};

type ItemProps = React.PropsWithChildren<{
  mui?: boolean;
  onClick?: () => void;
}>;

const Item = (props: ItemProps) => {
  if (!props.mui) {
    return (
      <StyledItemDiv>
        <p>{props.children}</p>
        <button onClick={props.onClick}>click me</button>
      </StyledItemDiv>
    );
  }

  return (
    <Card
      sx={{
        /**
         * Performance optimization
         * @link https://web.dev/contain-in-painting/
         */
        overflowAnchor: "none",
      }}
    >
      <CardHeader title={<Link>#{props.children}</Link>} />
      <CardContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dolor
        quaerat quo, corrupti, a, eligendi esse officiis consequatur sit aliquam
        voluptates aspernatur unde provident ut voluptas fugiat dolorem veniam
        aliquid.
      </CardContent>
      <CardActions>
        <Button onClick={props.onClick}>Share</Button>
      </CardActions>
    </Card>
  );
};

const StyledDiv = styled("div")({
  position: "absolute",
  insetInlineStart: 0,
  insetBlockStart: 0,

  paddingInlineEnd: 12,
  paddingBlockEnd: 12,
});

const StyledTotalSizeDiv = styled("div")({
  position: "relative",
});

const data: number[] = [];

for (let i = 0; i < 1000; i++) {
  data.push(i);
}

export const Component = () => {
  "use no memo";
  const [open, setOpen] = React.useState(false);

  const parentRef = React.useRef<HTMLDivElement>(null);
  const scrollingRef = React.useRef<number>(0);

  const scrollToFn: VirtualizerOptions<HTMLDivElement, Element>["scrollToFn"] =
    React.useCallback((offset, canSmooth, instance) => {
      const duration = 1000;
      const start = parentRef.current?.scrollTop || 0;
      const startTime = (scrollingRef.current = Date.now());

      const run = () => {
        if (scrollingRef.current !== startTime) return;
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = easeInOutQuint(Math.min(elapsed / duration, 1));
        const interpolated = start + (offset - start) * progress;

        if (elapsed < duration) {
          elementScroll(interpolated, canSmooth, instance);
          requestAnimationFrame(run);
        } else {
          elementScroll(interpolated, canSmooth, instance);
        }
      };

      requestAnimationFrame(run);
    }, []);

  const rowVirtualizer = useVirtualizer({
    count: 1000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 352,
    overscan: 5,
    scrollMargin: 12,
    useAnimationFrameWithResizeObserver: true,
    scrollToFn,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: 1000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
    overscan: 5,
    useAnimationFrameWithResizeObserver: true,
  });

  const handleToggleMui = () => setOpen((prev) => !prev);

  return (
    <>
      <Box
        data-contentfixed
        sx={{
          inlineSize: "100%",
          blockSize: "100%",
          position: "relative",
          zIndex: 1,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: (t) => t.palette.divider,
        }}
      >
        <ScrollView
          slotProps={{
            viewport: {
              ref: parentRef,
            },
          }}
        >
          <StyledTotalSizeDiv
            style={{
              inlineSize: columnVirtualizer.getTotalSize(),
              blockSize: rowVirtualizer.getTotalSize(),
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => (
              <React.Fragment key={virtualRow.key}>
                {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
                  <StyledDiv
                    key={virtualColumn.key}
                    style={{
                      inlineSize: virtualColumn.size,
                      blockSize: virtualRow.size,
                      transform: `translate3d(${virtualColumn.start}px, ${virtualRow.start}px, 0)`,
                    }}
                  >
                    <Item mui={open} onClick={handleToggleMui}>
                      {virtualRow.index}
                    </Item>
                  </StyledDiv>
                ))}
              </React.Fragment>
            ))}
          </StyledTotalSizeDiv>
        </ScrollView>
      </Box>
    </>
  );
};
