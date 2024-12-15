import { minmax } from "@/utils/minmax";
import { RestartAltOutlined } from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";

class Item {
  id: string;

  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {
    this.id = `x${this.x}y${this.y}`;
  }
}

class MinesweeperGame {
  readonly cells: Array<Item> = [];
  readonly marked: Set<string> = new Set();
  readonly opened: Set<string> = new Set();
  readonly bombs: Set<string> = new Set();
  started = false;

  constructor(
    public readonly columns: number,
    public readonly rows: number,
    public readonly bombNums: number,
    public readonly onGameOver: () => void,
    public readonly onGameStart: () => void,
  ) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.cells.push(new Item(j, i));
      }
    }

    while (this.bombs.size < this.bombNums) {
      this.bombs.add(
        this.cells[Math.floor(Math.random() * this.cells.length)].id,
      );
    }
  }

  open(item: Item) {
    this.start();
    this.opened.add(item.id);

    if (this.bombs.has(item.id)) {
      return this.lose();
    }

    const handled = new WeakSet<Item>();

    const fn = (item: Item) => {
      if (this.isAroundBomb(item)) {
        return;
      }

      if (handled.has(item)) {
        return;
      }

      handled.add(item);
      this.getAroundCells(item).forEach((el) => {
        this.opened.add(el.id);
        fn(el);
      });
    };

    fn(item);

    // Game over, only the bombs are left
    if (
      isEqualSet(
        this.bombs,
        new Set(
          this.cells
            .filter((item) => !this.opened.has(item.id))
            .map((item) => item.id),
        ),
      )
    ) {
      this.win();
      this.onGameOver();
    }
  }

  mark(id: string) {
    this.start();
    void [this.marked.has(id) ? this.marked.delete(id) : this.marked.add(id)];

    // The game is over, all bombs are marked
    if (isEqualSet(this.marked, this.bombs)) {
      this.win();
      this.onGameOver();
    }
  }

  start() {
    if (!this.started) {
      this.started = false;
      this.onGameStart();
    }
  }

  win() {
    this.bombs.forEach((i) => this.marked.add(i));
    this.cells.forEach((i) => this.bombs.has(i.id) || this.opened.add(i.id));
  }

  lose() {
    this.marked.clear();
    this.cells.forEach((i) => this.opened.add(i.id));
  }

  getAroundCells(item: Item) {
    return this.cells.filter(
      (el) =>
        !Object.is(item.id, el.id) &&
        Object.is(minmax(el.x, { min: item.x - 1, max: item.x + 1 }), el.x) &&
        Object.is(minmax(el.y, { min: item.y - 1, max: item.y + 1 }), el.y),
    );
  }

  getAroundBombs(item: Item) {
    return this.getAroundCells(item).filter((el) => this.bombs.has(el.id));
  }

  isAroundBomb(item: Item) {
    return this.getAroundCells(item).some((el) => this.bombs.has(el.id));
  }
}

type CellProps = {
  opened: boolean;
  marked: boolean;
  nums: number;
  borderStart?: boolean;
  onOpen(): void;
  onMark(): void;
  error?: boolean;
};

const Cell = (props: CellProps) => {
  const ref = React.useRef(null);
  const timerRef = React.useRef(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const observer = new ResizeObserver(([{ contentBoxSize }]) => {
      setHeight(contentBoxSize[0].inlineSize);
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const render = () => {
    if (props.opened) {
      return props.error ? "X" : props.nums;
    }

    if (props.marked) {
      return "!";
    }

    return;
  };

  return (
    <ButtonBase
      ref={ref}
      component={"div"}
      onClick={() => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(props.onMark, 200);
      }}
      onDoubleClick={() => {
        clearTimeout(timerRef.current);
        props.onOpen();
      }}
      disabled={props.opened}
      sx={(t) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        fontFamily: 'Consolas, "Courier New", monospace',
        fontSize: {
          xs: t.typography.body1.fontSize,
          sm: t.typography.h4.fontSize,
        },

        height: height,

        borderBlockStart: "1px solid " + t.palette.divider,
        borderInlineStart: props.borderStart
          ? "1px solid " + t.palette.divider
          : void 0,

        color: (props.opened && props.error) ? t.palette.error.main : void 0,
      })}
    >
      {render()}
    </ButtonBase>
  );
};

const MemoCell = React.memo(Cell);

export const Minesweeper = () => {
  const [{ game }, dispatch] = React.useReducer<
    { game: MinesweeperGame },
    null,
    [
      | {
        columns: number;
        rows: number;
        bombNums: number;
        onGameOver(): void;
        onGameStart(): void;
      }
      | void,
    ]
  >(
    ({ game }, action) =>
      action
        ? ({
          game: new MinesweeperGame(
            action.columns,
            action.rows,
            action.bombNums,
            action.onGameOver,
            action.onGameStart,
          ),
        })
        : ({ game }),
    null,
    () => ({ game: new MinesweeperGame(10, 10, 10, () => {}, () => {}) }),
  );

  return (
    <Card
      sx={{ maxWidth: (t) => ({ maxWidth: t.breakpoints.values.sm }) }}
    >
      <CardHeader
        title="Minesweeper"
        subheader={null}
        action={
          <IconButton
            onClick={() =>
              dispatch({
                columns: 9,
                rows: 9,
                bombNums: 1,
                onGameOver() {},
                onGameStart() {},
              })}
          >
            <RestartAltOutlined />
          </IconButton>
        }
      />
      <CardContent>
        <Grid2 container spacing={6}>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              select
            >
              <MenuItem value="easy">easy</MenuItem>
              <MenuItem value="normal">normal</MenuItem>
              <MenuItem value="hard">hard</MenuItem>
            </TextField>
          </Grid2>
        </Grid2>
      </CardContent>
      <Box
        sx={() => ({
          display: "grid",
          gridTemplateColumns: `repeat(${game.columns},minmax(0,1fr))`,
          gridTemplateRows: `repeat(${game.rows},minmax(0,1fr))`,
        })}
      >
        {game.cells.map((i, idx) => (
          <MemoCell
            key={i.id}
            opened={game.opened.has(i.id)}
            marked={game.marked.has(i.id)}
            nums={game.getAroundBombs(i).length}
            borderStart={!Object.is(idx % game.columns, 0)}
            onMark={() => {
              game.mark(i.id);
              dispatch();
            }}
            onOpen={() => {
              game.open(i);
              dispatch();
            }}
            error={game.bombs.has(i.id)}
          />
        ))}
      </Box>
    </Card>
  );
};

function isEqualSet(set1: Set<string>, set2: Set<string>) {
  return Object.is(
    [...set1.values()].sort().join(),
    [...set2.values()].sort().join(),
  );
}
