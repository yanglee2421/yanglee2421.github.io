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

export class MinesweeperGame {
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
      MinesweeperGame.isEqualSet(
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
    if (MinesweeperGame.isEqualSet(this.marked, this.bombs)) {
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
    if (!this.isRuning) return;

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
        MinesweeperGame.inRange(el.x, { min: item.x - 1, max: item.x + 1 }) &&
        MinesweeperGame.inRange(el.y, { min: item.y - 1, max: item.y + 1 }),
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
  get isRuning() {
    return this.isStarted && !this.isOver;
  }
  get isLost() {
    return this.status === GAME_STATUS.LOST;
  }
  get isWon() {
    return this.status === GAME_STATUS.WON;
  }

  static isEqualSet(set1: Set<string>, set2: Set<string>) {
    return Object.is(
      [...set1.values()].sort().join(),
      [...set2.values()].sort().join(),
    );
  }
  static minmax(
    num: number,
    { min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY },
  ) {
    return Math.min(Math.max(num, min), max);
  }
  static inRange(
    num: number,
    { min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY },
  ) {
    return Object.is(num, MinesweeperGame.minmax(num, { min, max }));
  }
}
