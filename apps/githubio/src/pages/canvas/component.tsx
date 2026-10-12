import { Box, useTheme } from "@mui/material";
import React from "react";
import {
  animationFrames,
  animationFrameScheduler,
  auditTime,
  BehaviorSubject,
  EMPTY,
  fromEvent,
  interval,
  map,
  merge,
  switchMap,
} from "rxjs";

interface Point {
  x: number;
  y: number;
}

const createMockList = () => {
  return Array.from({ length: 1024 }, () => Math.floor(255 * Math.random()));
};

const useBufferChartRef = () => {
  const ref = React.useRef<HTMLCanvasElement>(null);

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

    const mouseMove$ = fromEvent<MouseEvent>(el, "mousemove");
    const mouseEnter$ = fromEvent<MouseEvent>(el, "mouseenter");
    const mouseLeave$ = fromEvent<MouseEvent>(el, "mouseleave");
    const showAxis$ = new BehaviorSubject<boolean>(false);
    const buffer$ = new BehaviorSubject<number[]>([]);
    const point$ = new BehaviorSubject<Point>({ x: 0, y: 0 });

    const sub = merge(
      mouseEnter$.pipe(map(() => true)),
      mouseLeave$.pipe(map(() => false)),
    ).subscribe(showAxis$);

    const sub0 = showAxis$
      .pipe(
        switchMap((enter) => {
          if (!enter) {
            return EMPTY;
          }

          return mouseMove$;
        }),
        auditTime(0, animationFrameScheduler),
        map((e) => ({ x: e.clientX, y: e.clientY })),
      )
      .subscribe(point$);

    const sub1 = interval(200)
      .pipe(map(() => createMockList()))
      .subscribe(buffer$);

    const sub2 = animationFrames().subscribe(() => {
      ctx.clearRect(0, 0, 1024, 255);

      const rect = el.getBoundingClientRect();
      const list = buffer$.getValue();

      ctx.beginPath();
      ctx.strokeStyle = theme.palette.primary.main;
      ctx.moveTo(0, 0);
      list.forEach((height, index) => {
        ctx.lineTo(index, 255 - height);
      });
      ctx.stroke();

      if (showAxis$.getValue()) {
        const point = point$.getValue();
        const x = point.x - rect.x;
        const y = point.y - rect.y;
        const height = 255 - y;

        ctx.strokeStyle = theme.palette.error.main;
        ctx.fillStyle = theme.palette.text.primary;
        ctx.font = "14px serif";

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 255);
        ctx.stroke();
        ctx.fillText(x.toString(), x, 255);

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();
        ctx.fillText(height.toString(), 0, y);
      }
    });

    const subscritions = [sub, sub0, sub1, sub2];

    return () => {
      subscritions.forEach((sub) => {
        sub.unsubscribe();
      });
    };
  }, [
    theme.palette.primary.main,
    theme.palette.error.main,
    theme.palette.text.primary,
  ]);

  return ref;
};

export const Component = () => {
  const ref = useBufferChartRef();

  return (
    <Box>
      <canvas ref={ref} width={1024} height={255} style={{}} />
    </Box>
  );
};
