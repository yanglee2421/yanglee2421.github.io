import { minmax } from "@/utils/minmax";
import { RestartAltOutlined } from "@mui/icons-material";
import {
  alpha,
  Box,
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  IconButton,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import {
  blue,
  brown,
  cyan,
  deepPurple,
  green,
  grey,
  indigo,
  pink,
  red,
  teal,
} from "@mui/material/colors";
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

enum GAME_STATUS {
  PENDING,
  LOST,
  WON,
}

class MinesweeperGame {
  readonly cells: Array<Item> = [];
  readonly marked: Set<string> = new Set();
  readonly opened: Set<string> = new Set();
  readonly bombs: Set<string> = new Set();

  status: GAME_STATUS = GAME_STATUS.PENDING;
  startTime = 0;
  endTime = 0;

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
    this.marked.delete(item.id);

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
    }
  }

  mark(id: string) {
    if (this.opened.has(id)) return;

    this.start();
    void [this.marked.has(id) ? this.marked.delete(id) : this.marked.add(id)];

    // The game is over, all bombs are marked
    if (isEqualSet(this.marked, this.bombs)) {
      this.win();
    }
  }

  private start() {
    if (this.isStarted) return;
    if (this.isOver) return;

    this.startTime = Date.now();
    this.onGameStart();
  }

  private end() {
    if (!this.isStarted) return;
    if (this.isOver) return;

    this.endTime = Date.now();
    this.onGameOver();
  }

  private win() {
    this.status = GAME_STATUS.WON;
    this.bombs.forEach((i) => this.marked.add(i));
    this.cells.forEach((i) => this.bombs.has(i.id) || this.opened.add(i.id));
    this.end();
  }

  private lose() {
    this.status = GAME_STATUS.LOST;
    this.marked.clear();
    this.cells.forEach((i) => this.opened.add(i.id));
    this.end();
  }

  private getAroundCells(item: Item) {
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

  private isAroundBomb(item: Item) {
    return this.getAroundCells(item).some((el) => this.bombs.has(el.id));
  }

  get isStarted() {
    return !!this.startTime;
  }
  get isOver() {
    return !!this.endTime;
  }
  get isLost() {
    return this.status === GAME_STATUS.LOST;
  }
  get isWon() {
    return this.status === GAME_STATUS.WON;
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
  disabled: boolean;
};

const map = new Map<number, string>();

const Cell = (props: CellProps) => {
  const ref = React.useRef(null);
  const timerRef = React.useRef(0);
  const lastPressRef = React.useRef(0);
  const [height, setHeight] = React.useState(0);
  const theme = useTheme();

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

  map.set(
    0,
    alpha(
      grey[500],
      theme.palette.action.disabledOpacity,
    ),
  );
  map.set(
    1,
    alpha(
      green[500],
      theme.palette.action.disabledOpacity,
    ),
  );
  map.set(
    2,
    alpha(
      blue[500],
      theme.palette.action.disabledOpacity,
    ),
  );
  map.set(
    3,
    alpha(
      indigo[500],
      theme.palette.action.disabledOpacity,
    ),
  );
  map.set(
    4,
    alpha(
      deepPurple[500],
      theme.palette.action.disabledOpacity,
    ),
  );
  map.set(
    4,
    alpha(
      teal[500],
      theme.palette.action.disabledOpacity,
    ),
  );
  map.set(
    5,
    alpha(
      cyan[500],
      theme.palette.action.disabledOpacity,
    ),
  );
  map.set(
    6,
    alpha(
      brown[500],
      theme.palette.action.disabledOpacity,
    ),
  );
  map.set(
    7,
    alpha(
      pink[500],
      theme.palette.action.disabledOpacity,
    ),
  );
  map.set(
    9,
    alpha(
      red[500],
      theme.palette.action.disabledOpacity,
    ),
  );

  const renderColor = () => {
    if (!props.opened) {
      return props.marked ? theme.palette.warning.main : void 0;
    }

    if (props.error) {
      return theme.palette.error.main;
    }

    return map.get(props.nums);
  };

  return (
    <ButtonBase
      ref={ref}
      component={"div"}
      onPointerUp={(e) => {
        e.preventDefault();

        if (e.pointerType === "mouse") {
          void [
            e.button === 0 && props.onOpen(),
            e.button === 2 && props.onMark(),
          ];

          return;
        }

        const now = Date.now();
        const diff = now - lastPressRef.current;
        clearTimeout(timerRef.current);

        if (diff < 300) {
          props.onOpen();
        } else {
          timerRef.current = setTimeout(props.onMark, 300);
        }

        lastPressRef.current = now;
      }}
      onContextMenu={(e) => e.preventDefault()}
      disabled={props.disabled}
      sx={(t) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        color: renderColor(),
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

        touchAction: "manipulation",
      })}
    >
      {render()}
    </ButtonBase>
  );
};

const MemoCell = React.memo(Cell);

type ReducerState = { game: MinesweeperGame };
type ReducerActionArgs = [ConstructorParameters<typeof MinesweeperGame> | void];

export const Minesweeper = () => {
  const [{ game }, dispatch] = React.useReducer<
    ReducerState,
    null,
    ReducerActionArgs
  >(
    ({ game }, args) =>
      args
        ? ({
          game: new MinesweeperGame(
            args[0],
            args[1],
            args[2],
            args[3],
            args[4],
          ),
        })
        : ({ game }),
    null,
    () => ({ game: new MinesweeperGame(10, 10, 10, Boolean, Boolean) }),
  );

  const [now, setNow] = React.useState(0);

  React.useEffect(() => {
    let timer = 0;

    const fn = () => {
      timer = requestAnimationFrame(fn);
      setNow(Date.now());
    };

    fn();

    return () => cancelAnimationFrame(timer);
  }, []);

  const renderSubheader = () => {
    if (!game.isStarted) return "Standing by";

    let diff = now - game.startTime;

    if (game.isOver) {
      diff = game.endTime - game.startTime;
    }

    const s = Math.floor(diff / 1000);
    const ms = diff % 1000;

    return `${s}s${ms}ms`;
  };

  return (
    <Card
      sx={{ maxWidth: (t) => ({ maxWidth: t.breakpoints.values.sm }) }}
    >
      <CardHeader
        title="Minesweeper"
        subheader={renderSubheader()}
        action={
          <IconButton
            onClick={() =>
              dispatch([
                game.columns,
                game.rows,
                game.bombNums,
                Boolean,
                Boolean,
              ])}
          >
            <RestartAltOutlined />
          </IconButton>
        }
      />
      <CardContent>
        <Grid2 container spacing={6}>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              value={`${game.columns},${game.rows},${game.bombNums}`}
              onChange={(e) => {
                const list = e.target.value.split(",").map((i) =>
                  Number.parseInt(i)
                );

                dispatch([list[0], list[1], list[2], Boolean, Boolean]);
              }}
              fullWidth
              select
            >
              <MenuItem value="10,10,10">Easy</MenuItem>
              <MenuItem value="10,12,12">Normal</MenuItem>
              <MenuItem value="10,14,14">Hard</MenuItem>
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
            disabled={game.isOver || game.opened.has(i.id)}
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
