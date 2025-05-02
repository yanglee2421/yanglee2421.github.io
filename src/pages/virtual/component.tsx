import { ScrollView } from "@/components/scrollbar";
import { chunk } from "@/lib/utils";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Link,
} from "@mui/material";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";

const Item = (props: React.PropsWithChildren) => {
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
        <Button>Share</Button>
      </CardActions>
    </Card>
  );
};

const data: number[] = [];

for (let i = 0; i < 1000; i++) {
  data.push(i);
}

export const Component = () => {
  "use no memo";
  const [cols, setCols] = React.useState(8);

  const parentRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const list = chunk(data, cols);
  const virtual = useVirtualizer({
    count: list.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 3,
  });

  const items = virtual.getVirtualItems();

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { inlineSize } = entry.contentBoxSize[0];
        const cols = Math.floor(inlineSize / 280);
        setCols(cols);
      });
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Box sx={{ height: 600 }}>
        <ScrollView
          slotProps={{
            viewport: {
              ref: parentRef,
            },
          }}
        >
          <Box
            ref={containerRef}
            sx={{
              height: virtual.getTotalSize(),
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                inlineSize: "100%",

                willChange: "transform",
                contain: "paint",
              }}
              style={{
                transform: `translate3d(0, ${items[0]?.start || 0}px, 0)`,
              }}
            >
              {items.map((item) => {
                const row = list[item.index];

                return (
                  <Box
                    data-index={item.index}
                    ref={virtual.measureElement}
                    key={item.index}
                    sx={{
                      paddingBlockEnd: Object.is(item.index, list.length - 1)
                        ? 0
                        : 3,
                      display: "grid",
                      gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`,
                      gap: 3,
                    }}
                  >
                    {row.map((i, idx) => (
                      <Item key={i}>{row[idx]}</Item>
                    ))}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </>
  );
};
