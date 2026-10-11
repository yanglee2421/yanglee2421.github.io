import { Box, useTheme } from "@mui/material";
import React from "react";
import { animationFrames, BehaviorSubject, interval, map, tap } from "rxjs";

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

  const theme = useTheme();

  React.useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const ctx = el.getContext("2d");

    if (!ctx) {
      return;
    }

    const sub1 = interval(200)
      .pipe(map(() => createMockList()))
      .subscribe(list$);

    const sub2 = animationFrames()
      .pipe(
        tap(() => {
          ctx.clearRect(0, 0, 1024, 255);

          const rect = el.getBoundingClientRect();
          const list = list$.getValue();

          ctx.beginPath();
          ctx.strokeStyle = theme.palette.primary.main;
          ctx.moveTo(0, 0);
          list.forEach((height, index) => {
            ctx.lineTo(index, 255 - height);
          });
          ctx.stroke();
          ctx.closePath();

          if (enabledRef.current) {
            const x = pointRef.current.x - rect.x;
            const y = pointRef.current.y - rect.y;
            ctx.strokeStyle = theme.palette.error.main;
            ctx.fillStyle = theme.palette.text.primary;
            ctx.font = "14px serif";

            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 255);
            ctx.stroke();
            ctx.closePath();
            ctx.fillText(x.toString(), x, 255);

            const height = 255 - y;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(1024, y);
            ctx.stroke();
            ctx.closePath();
            ctx.fillText(height.toString(), 0, y);
          }
        }),
      )
      .subscribe();

    return () => {
      sub1.unsubscribe();
      sub2.unsubscribe();
    };
  }, [
    theme.palette.primary.main,
    theme.palette.error.main,
    theme.palette.text.primary,
  ]);

  return (
    <Box>
      <canvas
        ref={ref}
        width={1024}
        height={255}
        style={{}}
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
