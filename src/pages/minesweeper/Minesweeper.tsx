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

    return new Set(Array.from(set, (item) => list[item].id));
  });

  const [open, setOpen] = React.useState<Set<string>>(new Set());
  const [signed, setSigned] = React.useState<Set<string>>(new Set());
  const [] = React.useState();

  const renderIcon = (item: Item) => {
    const id = item.id;

    if (signed.has(id)) {
      return <FlagCircleOutlined color="warning" />;
    }

    if (!open.has(id)) {
      return <CircleOutlined />;
    }

    if (bombs.has(id)) {
      return <OfflineBoltOutlined color="error" />;
    }

    const arroundBombs = getAroundBombs(item, list, bombs);

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
                      if (bombs.has(item.id)) {
                        setOpen(new Set(list.map((item) => item.id)));
                        return;
                      }

                      setSigned((prev) => {
                        const nextValue = new Set(prev);
                        nextValue.delete(item.id);

                        return nextValue;
                      });

                      let nextOpen = new Set<string>();

                      setOpen((prev) => {
                        nextOpen = new Set(prev);
                        nextOpen.add(item.id);

                        const handled = new Set<Item>();

                        const fn = (item: Item) => {
                          if (getAroundBombs(item, list, bombs)) {
                            return;
                          }

                          if (handled.has(item)) {
                            return;
                          }

                          handled.add(item);
                          getAroundItems(item, list).forEach((el) => {
                            nextOpen.add(el.id);
                            fn(el);
                          });
                        };

                        fn(item);

                        return nextOpen;
                      });

                      // Game over, only the bombs are left
                      if (
                        !isEqualSet(
                          bombs,
                          new Set(
                            list
                              .filter((item) => !nextOpen.has(item.id))
                              .map((item) => item.id),
                          ),
                        )
                      ) {
                        return;
                      }

                      setSigned(bombs);
                      setOpen(
                        new Set(
                          list
                            .filter((el) => !bombs.has(el.id))
                            .map((el) => el.id),
                        ),
                      );
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();

                      let nextMarked = new Set<string>();

                      setSigned((prev) => {
                        nextMarked = new Set(prev);
                        nextMarked.has(item.id)
                          ? nextMarked.delete(item.id)
                          : nextMarked.add(item.id);
                        return nextMarked;
                      });

                      // The game is over, all bombs are marked
                      if (!isEqualSet(nextMarked, bombs)) {
                        return;
                      }

                      setSigned(bombs);
                      setOpen(
                        new Set(
                          list
                            .filter((item) => !bombs.has(item.id))
                            .map((item) => item.id),
                        ),
                      );
                    }}
                    disabled={open.has(item.id)}
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

function getAroundItems(item: Item, list: Item[]) {
  return list.filter(
    (el) =>
      !Object.is(item.id, el.id) &&
      Object.is(minmax(el.x, { min: item.x - 1, max: item.x + 1 }), el.x) &&
      Object.is(minmax(el.y, { min: item.y - 1, max: item.y + 1 }), el.y),
  );
}

function isEqualSet(set1: Set<string>, set2: Set<string>) {
  return Object.is(
    [...set1.values()].sort().join(),
    [...set2.values()].sort().join(),
  );
}

function getAroundBombs(item: Item, list: Item[], bombs: Set<string>) {
  return getAroundItems(item, list).reduce((count, el) => {
    if (bombs.has(el.id)) {
      return count + 1;
    }

    return count;
  }, 0);
}
