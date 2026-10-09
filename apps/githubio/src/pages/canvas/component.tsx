import { Box } from "@mui/material";
import React from "react";
import { BehaviorSubject, interval, map } from "rxjs";

const createMockList = () => {
  return Array.from({ length: 1024 }, () => Math.floor(255 * Math.random()));
};

const list$ = new BehaviorSubject<number[]>([]);

interface Point {
  x: number;
  y: number;
}

export const Component = () => {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const pointRef = React.useRef<Point>({ x: 0, y: 0 });
  const enabledRef = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const ctx = el.getContext("2d");

    if (!ctx) {
      return;
    }

    interval(64)
      .pipe(map(() => createMockList()))
      .subscribe(list$);

    let raf: number;
    const fn = () => {
      ctx.clearRect(0, 0, 1024, 255);

      const rect = el.getBoundingClientRect();
      const list = list$.getValue();

      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.moveTo(0, 0);
      list.forEach((height, index) => {
        ctx.lineTo(index, 255 - height);
      });
      ctx.stroke();
      ctx.closePath();

      if (enabledRef.current) {
        const x = pointRef.current.x - rect.x;

        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 255);
        ctx.stroke();
        ctx.closePath();

        ctx.font = "14px serif";
        ctx.fillText(x.toString(), x, 255);

        const y = pointRef.current.y - rect.y;
        const height = 255 - y;
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();
        ctx.closePath();

        ctx.font = "14px serif";
        ctx.fillText(height.toString(), 0, y);
      }

      raf = requestAnimationFrame(fn);
    };

    fn();

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Box>
      <canvas
        ref={ref}
        width={1024}
        height={255}
        style={{
          border: "1px dashed red",
        }}
        onMouseMove={(e) => {
          pointRef.current = {
            x: e.clientX,
            y: e.clientY,
          };
        }}
        onMouseEnter={() => {
          enabledRef.current = true;
        }}
        onMouseLeave={() => {
          enabledRef.current = false;
        }}
      />
    </Box>
  );
};
