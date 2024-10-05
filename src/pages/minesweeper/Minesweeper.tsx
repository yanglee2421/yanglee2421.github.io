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

  const renderIcon = (id: string) => {
    if (signed.includes(id)) {
      return <FlagCircleOutlined fontSize="large" color="warning" />;
    }

    if (!open.includes(id)) {
      return <CircleOutlined fontSize="large" />;
    }

    if (bombs.includes(id)) {
      return <OfflineBoltOutlined fontSize="large" color="error" />;
    }

    return <Filter1Outlined fontSize="large" color="success" />;
  };

  return (
    <Card>
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
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(9,minmax(0,1fr))",
            gridTemplateRows: "repeat(9,minmax(0,1fr))",
            placeItems: "center",
          }}
        >
          {list.map((item) => (
            <IconButton
              key={item.id}
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
              {renderIcon(item.id)}
            </IconButton>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

class Item {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}

  get id() {
    return `x${this.x}y${this.y}`;
  }
}
