import {
  Box,
  FormControlLabel,
  Grid,
  styled,
  Switch,
  useTheme,
} from "@mui/material";
import React from "react";
import {
  animationFrames,
  animationFrameScheduler,
  auditTime,
  BehaviorSubject,
  concatMap,
  distinctUntilChanged,
  EMPTY,
  from,
  fromEvent,
  interval,
  map,
  merge,
  share,
  switchMap,
} from "rxjs";
import { useImmer } from "use-immer";
import workerPath from "./worker?worker&url";

const createMockList = () => {
  const arr = new Uint8Array(1024);
  crypto.getRandomValues(arr);

  return arr;
};

interface State {
  open: boolean;
  interval: number;
}
const state$ = new BehaviorSubject<State>({ open: false, interval: 0 });
const frame$ = state$.pipe(
  distinctUntilChanged(
    (p, c) => p.open === c.open && p.interval === c.interval,
  ),
  switchMap((state) => {
    if (!state.open) {
      return EMPTY;
    }

    return interval(state.interval);
  }),
  map(createMockList),
  share(),
);
const saveToFile$ = frame$.pipe(
  concatMap((data) => {
    return from(Promise.resolve(data));
  }),
);

const Input = styled("input")({
  display: "block",
  width: "100%",
});

interface Point {
  x: number;
  y: number;
}

interface Gate {
  x: number;
  y: number;
  width: number;
}

const gate$ = new BehaviorSubject<Gate>({ x: 0, y: 0, width: 0 });

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
      .pipe(map(() => [...createMockList()]))
      .subscribe(buffer$);

    const sub2 = animationFrames().subscribe(() => {
      ctx.clearRect(0, 0, el.width, el.height);

      const list = buffer$.getValue();
      const gate = gate$.getValue();

      ctx.strokeStyle = theme.palette.primary.main;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      list.forEach((height, index) => {
        ctx.lineTo(index, 255 - height);
      });
      ctx.stroke();

      ctx.strokeStyle = theme.palette.error.main;
      ctx.beginPath();
      ctx.moveTo(gate.x, el.height - gate.y);
      ctx.lineTo(gate.x + gate.width, el.height - gate.y);
      ctx.stroke();

      if (showAxis$.getValue()) {
        const rect = el.getBoundingClientRect();
        const scaleX = el.width / rect.width;
        const scaleY = el.height / rect.height;
        const point = point$.getValue();
        const x = (point.x - rect.x) * scaleX;
        const y = (point.y - rect.y) * scaleY;
        const height = 255 - y;

        ctx.strokeStyle = theme.palette.error.main;
        ctx.fillStyle = theme.palette.text.primary;
        ctx.font = "14px serif";

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 255);
        ctx.stroke();
        ctx.fillText(Math.floor(x).toString(), x, 255);

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();
        ctx.fillText(Math.floor(height).toString(), 0, y);
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
  const [gate, setGate] = useImmer({
    x: 0,
    y: 0,
    width: 0,
  });

  const [state, setState] = useImmer({
    open: false,
    interval: 200,
  });

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 255;
    el.appendChild(canvas);

    const offscreen = canvas.transferControlToOffscreen();
    const worker = new Worker(workerPath, { type: "module" });
    const sub1 = frame$.subscribe((data) => {
      worker.postMessage(data);
    });
    const subs = [sub1];

    worker.postMessage(offscreen, [offscreen]);

    return () => {
      el.removeChild(canvas);

      worker.terminate();
      subs.forEach((sub) => {
        sub.unsubscribe();
      });
    };
  }, []);

  React.useEffect(() => {
    state$.next(state);
  }, [state]);

  return (
    <Box>
      <div ref={ref}></div>
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControlLabel
            control={
              <Switch
                checked={state.open}
                onChange={(_, checked) => {
                  setState((draft) => {
                    draft.open = checked;
                  });
                }}
              />
            }
            label="启用"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            type="number"
            value={gate.x}
            onChange={(e) => {
              setGate((draft) => {
                draft.x = e.target.valueAsNumber;
              });
            }}
            min={0}
            max={1024}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            type="number"
            value={gate.y}
            onChange={(e) => {
              setGate((draft) => {
                draft.y = e.target.valueAsNumber;
              });
            }}
            min={0}
            max={255}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            type="number"
            value={gate.width}
            onChange={(e) => {
              setGate((draft) => {
                draft.width = e.target.valueAsNumber;
              });
            }}
            min={0}
            max={1024}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
