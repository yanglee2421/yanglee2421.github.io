import {
  CircleOutlined,
  FlagCircleOutlined,
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
  const [list, setList] = React.useState(() => {
    const arr = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        arr.push(new Item(j, i));
      }
    }

    return arr;
  });
  const [booms] = React.useState(() => {
    const idx = Math.floor(Math.random() * list.length);

    return [list[idx].id];
  });

  const [open, setOpen] = React.useState<string[]>([]);
  const [signed, setSigned] = React.useState<string[]>([]);
  const [] = React.useState();

  console.log(list);

  const renderIcon = (id: string) => {
    if (signed.includes(id)) {
      return <FlagCircleOutlined fontSize="large" />;
    }

    if (!open.includes(id)) {
      return <CircleOutlined fontSize="large" />;
    }

    if (booms.includes(id)) {
      return <OfflineBoltOutlined fontSize="large" color="error" />;
    }

    return <Filter1Outlined fontSize="large" />;
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

                setOpen((p) => [...p, item.id]);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                setSigned((p) => [...p, item.id]);
              }}
              disabled={open.includes(item.id) || signed.includes(item.id)}
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
