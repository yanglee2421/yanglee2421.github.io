import { minmax } from "@/utils/minmax";
import {
  CircleOutlined,
  FlagCircleOutlined,
  FilterNoneOutlined,
  Filter1Outlined,
  Filter2Outlined,
  Filter3Outlined,
  Filter4Outlined,
  Filter5Outlined,
  Filter6Outlined,
  Filter7Outlined,
  Filter8Outlined,
  CloseOutlined,
  OfflineBoltOutlined,
} from "@mui/icons-material";
import { Box, Card, IconButton, CardContent, CardHeader } from "@mui/material";
import React from "react";

export function Minesweeper() {
  const [list] = React.useState(() => {
    const arr = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        arr.push(new Item(j, i));
      }
    }

    return arr;
  });
  const [bombs] = React.useState(() => {
    const set = new Set<number>();

    while (set.size < 10) {
      set.add(Math.floor(Math.random() * list.length));
    }

    return Array.from(set, (item) => list[item].id);
  });

  const [open, setOpen] = React.useState<string[]>([]);
  const [signed, setSigned] = React.useState<string[]>([]);
  const [] = React.useState();

  const renderIcon = (item: Item) => {
    const id = item.id;

    if (signed.includes(id)) {
      return <FlagCircleOutlined color="warning" />;
    }

    if (!open.includes(id)) {
      return <CircleOutlined />;
    }

    if (bombs.includes(id)) {
      return <OfflineBoltOutlined color="error" />;
    }

    const arroundBombs = list
      .filter((el) => {
        return (
          Object.is(minmax(el.x, { min: item.x - 1, max: item.x + 1 }), el.x) &&
          Object.is(minmax(el.y, { min: item.y - 1, max: item.y + 1 }), el.y)
        );
      })
      .reduce((count, el) => {
        if (bombs.includes(el.id)) {
          return count + 1;
        }

        return count;
      }, 0);

    switch (arroundBombs) {
      case 0:
        return <FilterNoneOutlined color="success" />;
      case 1:
        return <Filter1Outlined color="info" />;
      case 2:
        return <Filter2Outlined color="secondary" />;
      case 3:
        return <Filter3Outlined color="primary" />;
      case 4:
        return <Filter4Outlined color="action" />;
      case 5:
        return <Filter5Outlined color="error" />;
      case 6:
        return <Filter6Outlined />;
      case 7:
        return <Filter7Outlined />;
      case 8:
        return <Filter8Outlined />;
    }
  };

  return (
    <Box>
      <Card
        sx={{
          marginInline: "auto",
          inlineSize: "fit-content",
          minInlineSize: 560,
        }}
      >
        <CardHeader
          title="minesweeper"
          subheader={new Date().toLocaleTimeString()}
          action={
            <IconButton>
              <CloseOutlined />
            </IconButton>
          }
        />
        <CardContent>
          <Box
            sx={(t) => ({
              display: "grid",
              gridTemplateColumns: "repeat(9,minmax(0,1fr))",
              gridTemplateRows: "repeat(9,minmax(0,1fr))",
              placeItems: "center",
              borderStyle: "solid",
              borderColor: t.palette.divider,
              borderWidth: "0 0 1px 1px",
            })}
          >
            {list.map((item) => (
              <Box
                key={item.id}
                sx={(t) => ({
                  position: "relative",
                  inlineSize: "100%",
                  borderStyle: "solid",
                  borderColor: t.palette.divider,
                  borderWidth: "1px 1px 0 0",
                })}
              >
                <Box
                  sx={{
                    paddingInlineStart: "100%",
                    paddingBlockStart: "100%",
                    inlineSize: 0,
                    blockSize: 0,
                  }}
                ></Box>
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 10,
                    inlineSize: "100%",
                    blockSize: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={(e) => {
                      if (e.button !== 0) {
                        return;
                      }

                      // Game over, because the bomb was clicked
                      if (bombs.includes(item.id)) {
                        setOpen(list.map((item) => item.id));
                        return;
                      }

                      let nextOpen: string[] = [];

                      setSigned((p) => p.filter((el) => el !== item.id));
                      setOpen((p) => {
                        nextOpen = [...p, item.id];
                        return nextOpen;
                      });

                      // Game over, only the bombs are left
                      const restIds = list.filter(
                        (item) => !nextOpen.includes(item.id),
                      );

                      if (restIds.length !== bombs.length) {
                        return;
                      }

                      if (restIds.some((el) => !bombs.includes(el.id))) {
                        return;
                      }

                      setSigned(bombs.slice());
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();

                      let nextMarked: string[] = [];

                      setSigned((p) => {
                        nextMarked = [...p, item.id];
                        return nextMarked;
                      });

                      // The game is over, all bombs are marked
                      if (nextMarked.length !== bombs.length) {
                        return;
                      }

                      if (nextMarked.some((id) => !bombs.includes(id))) {
                        return;
                      }

                      setOpen(
                        list
                          .filter((item) => !bombs.includes(item.id))
                          .map((item) => item.id),
                      );
                    }}
                    disabled={open.includes(item.id)}
                    size="large"
                  >
                    {renderIcon(item)}
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

class Item {
  id: string;

  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {
    this.id = `x${this.x}y${this.y}`;
  }
}
