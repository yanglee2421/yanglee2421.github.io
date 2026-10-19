import { useChannelInputs } from "@/hooks/store/use-channel-inputs";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  styled,
  Switch,
} from "@mui/material";
import React from "react";
import {
  BehaviorSubject,
  concatMap,
  distinctUntilChanged,
  EMPTY,
  from,
  interval,
  map,
  Subscription,
  switchMap,
} from "rxjs";
import { useShallow } from "zustand/shallow";
import type { MessageAction } from "./worker";
import workerPath from "./worker?worker&url";

class WorkerCanvas {
  private readonly worker = new Worker(workerPath, { type: "module" });
  private readonly canvas = new Map<string, HTMLCanvasElement>();
  private readonly subscriptions: Subscription[];

  constructor() {
    const sub1 = frame$.subscribe((frame) => {
      this.sendMessage({
        type: "set-buffer",
        payload: { channel: frame.channel, buffer: frame.buffer },
      });
    });

    this.subscriptions = [sub1];
  }

  dispose() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
    this.canvas.forEach((c) => {
      c.remove();
    });
    this.canvas.clear();
    this.worker.terminate();
  }

  sendMessage(
    action: MessageAction,
    transferable?: StructuredSerializeOptions,
  ) {
    this.worker.postMessage(action, transferable);
  }

  createCanvas(channel: string, parent: Node) {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 255;
    const offscreen = canvas.transferControlToOffscreen();
    this.sendMessage(
      { type: "set-canvas", payload: { channel, canvas: offscreen } },
      { transfer: [offscreen] },
    );
    parent.appendChild(canvas);
    this.canvas.set(channel, canvas);
  }

  removeCanvas(channel: string) {
    this.sendMessage({ type: "remove-canvas", payload: { channel } });
    this.getCanvas(channel)?.remove();
    this.canvas.delete(channel);
  }

  getCanvas(channel: string) {
    return this.canvas.get(channel);
  }
}

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

    let index = 0;

    return interval(state.interval).pipe(
      map(() => {
        const buffer = new Uint8Array(1024);
        crypto.getRandomValues(buffer);
        const channels = useChannelInputs.getState().channels;
        const channel = channels[index].id;
        index = (index + 1) % channels.length;

        return { channel, buffer };
      }),
    );
  }),
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

export const Component = () => {
  const canvasRef = React.useRef<Map<string, HTMLDivElement>>(null);
  const workerRef = React.useRef<WorkerCanvas>(null);

  const interval = useChannelInputs((state) => state.interval);
  const open = useChannelInputs((state) => state.open);
  const channels = useChannelInputs(
    useShallow((s) => s.channels.map((i) => i.id)),
  );
  const inputs = useChannelInputs((s) => s.channels);

  React.useEffect(() => {
    workerRef.current = new WorkerCanvas();

    return () => {
      workerRef.current?.dispose();
    };
  }, []);

  React.useEffect(() => {
    state$.next({ interval, open });
  }, [interval, open]);

  React.useEffect(() => {
    channels.forEach((c) => {
      const canvas = canvasRef.current?.get(c);

      if (canvas) {
        workerRef.current?.createCanvas(c, canvas);
      }
    });

    return () => {
      channels.forEach((c) => {
        workerRef.current?.removeCanvas(c);
      });
    };
  }, [channels]);

  React.useEffect(() => {
    inputs.forEach((input) => {
      workerRef.current?.sendMessage({
        type: "set-gate",
        payload: {
          channel: input.id,
          gates: input.gates,
        },
      });
    });
  }, [inputs]);

  return (
    <Stack spacing={1.5}>
      <Card>
        <CardHeader title="Header" />
        <CardContent>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={open}
                    onChange={(_, checked) => {
                      useChannelInputs.setState((draft) => {
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
                value={interval}
                onChange={(e) => {
                  useChannelInputs.setState((draft) => {
                    draft.interval = e.target.valueAsNumber;
                  });
                }}
                min={0}
                max={1024}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {inputs.map((channel, chIndex) => {
        return (
          <Card key={channel.id}>
            <CardContent>
              <div
                data-channel={channel}
                ref={(el) => {
                  if (!el) {
                    return;
                  }

                  canvasRef.current ??= new Map();
                  const eles = canvasRef.current;
                  eles.set(channel.id, el);

                  return () => {
                    eles.delete(channel.id);
                  };
                }}
              ></div>
            </CardContent>
            <Divider />
            <CardContent>
              <Grid container spacing={1.5}>
                {channel.gates.map((gate, index) => {
                  return (
                    <Grid size={12} key={index}>
                      <Input
                        type="number"
                        value={gate.x}
                        onChange={(e) => {
                          useChannelInputs.setState((draft) => {
                            draft.channels[chIndex].gates[index].x =
                              e.target.valueAsNumber;
                          });
                        }}
                      />
                      <Input
                        type="number"
                        value={gate.y}
                        onChange={(e) => {
                          useChannelInputs.setState((draft) => {
                            draft.channels[chIndex].gates[index].y =
                              e.target.valueAsNumber;
                          });
                        }}
                      />
                      <Input
                        type="number"
                        value={gate.width}
                        onChange={(e) => {
                          useChannelInputs.setState((draft) => {
                            draft.channels[chIndex].gates[index].width =
                              e.target.valueAsNumber;
                          });
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
};
