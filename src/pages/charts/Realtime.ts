import { random } from "./random";

export class Realtime {
  lastX = Date.now();
  interval = 1000;
  range = 1000 * 8;
  data: Array<{
    x: number;
    y: number;
  }> = [];

  constructor() {
    for (let i = 0; i < this.range / this.interval + 2; i++) {
      this.lastX += this.interval;

      this.data.push({
        x: this.lastX,
        y: 0,
      });
    }
  }

  update() {
    this.lastX += this.interval;

    this.data.push({
      x: this.lastX,
      y: Math.floor(random() * 100),
    });

    const minX = this.lastX - this.range - this.interval;

    this.data.forEach((item) => {
      if (item.x < minX) {
        item.x = minX;
        item.y = 0;
      }
    });
  }
}
