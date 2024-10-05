import {
  CircleOutlined,
  FlagCircleOutlined,
  LooksOneOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Paper } from "@mui/material";
import React from "react";

export function Minesweeper() {
  const [list, setList] = React.useState(() => {
    const arr = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        arr.push(new Item(i, j));
      }
    }

    return arr;
  });

  const [open, setOpen] = React.useState<string[]>([]);
  const [signed, setSigned] = React.useState<string[]>([]);
  const [] = React.useState();

  console.log(list);

  const renderIcon = (id: string) => {
    if (open.includes(id)) {
      return <LooksOneOutlined fontSize="large" />;
    }

    if (signed.includes(id)) {
      return <FlagCircleOutlined fontSize="large" />;
    }

    return <CircleOutlined fontSize="large" />;
  };

  return (
    <Paper
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
          onClick={() => {
            setOpen((p) => [...p, item.id]);
          }}
          size="large"
        >
          {renderIcon(item.id)}
        </IconButton>
      ))}
    </Paper>
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
