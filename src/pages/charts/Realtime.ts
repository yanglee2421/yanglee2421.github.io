import { random } from "./random";

export class Realtime {
  lastDate = 0;
  TICKINTERVAL = 1000;
  XAXISRANGE = 1000 * 7;
  data: Array<{
    x: number;
    y: number;
  }> = [];

  getDayWiseTimeSeries(baseval: number, count: number, yrange: Yrange) {
    for (let i = 0; i < count; i++) {
      this.data.push({
        x: baseval,
        y: Math.floor(random() * (yrange.max - yrange.min + 1)) + yrange.min,
      });
      this.lastDate = baseval;
      baseval += this.TICKINTERVAL;
    }
  }

  getNewSeries(baseval: number, yrange: Yrange) {
    const newDate = baseval + this.TICKINTERVAL;
    this.lastDate = newDate;

    for (let i = 0; i < this.data.length - 12; i++) {
      this.data[i].x = this.lastDate - this.XAXISRANGE - this.TICKINTERVAL;
      this.data[i].y = 0;
    }

    this.data.push({
      x: newDate,
      y: Math.floor(random() * (yrange.max - yrange.min + 1)) + yrange.min,
    });
  }
}

interface Yrange {
  min: number;
  max: number;
}
