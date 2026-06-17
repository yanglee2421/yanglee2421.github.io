import { Add, Stop } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useNotifications } from "@toolpad/core";
import React from "react";
import {
  BehaviorSubject,
  last,
  NEVER,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  using,
} from "rxjs";

class DemoStore {
  value: number;
  path: string;

  constructor(path: string) {
    this.value = Math.floor(Math.random() * 100);
    this.path = path;
  }

  open() {
    console.log("start");

    const id = setInterval(() => {
      console.log("run", this.value, this.path);
    }, 1000 * 2);

    return id;
  }

  close(id: NodeJS.Timeout) {
    console.log("closed");

    clearInterval(id);
  }
}

const path$ = new BehaviorSubject<string>("com1");

const shareTest$ = path$
  .pipe(
    switchMap((path) => {
      return using(
        () => {
          const store = new DemoStore(path);
          console.log("open", store.path, store.value);
          const id = store.open();

          return {
            unsubscribe: () => {
              console.log("unsubscribe", store.path, store.value);
              store.close(id);
            },
            store,
          };
        },
        (c) => {
          const store = Reflect.get(Object(c), "store");

          return NEVER.pipe(startWith(store.value));
        },
      );
    }),
  )
  .pipe(
    takeUntil(path$.pipe(last())),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

interface TestItemProps {
  onClick: () => void;
}

const TestItem = (props: TestItemProps) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const sub = shareTest$.subscribe((c) => {
      setValue(c);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <Button onClick={props.onClick} variant="outlined">
      {value}
    </Button>
  );
};

interface AutoSubmitFormProps {
  enabled?: boolean;
}

const AutoSubmitForm = (props: AutoSubmitFormProps) => {
  const [inputValue, setInputValue] = React.useState("");

  const formRef = React.useRef<HTMLFormElement>(null);

  const toast = useNotifications();

  React.useEffect(() => {
    if (!props.enabled) return;
    if (!inputValue) return;

    const timer = setTimeout(() => {
      formRef.current?.requestSubmit();
    }, 1000 * 2);

    return () => {
      clearTimeout(timer);
    };
  }, [props.enabled, inputValue]);

  return (
    <Card>
      <CardHeader />
      <CardContent>
        <form
          noValidate
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            toast.show("form submited");
            setInputValue("");
          }}
        >
          <TextField
            fullWidth
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export const Component = () => {
  const [list, setList] = React.useState<string[]>([]);
  const [path, setPath] = React.useState<string>("com1");

  React.useEffect(() => {
    path$.next(path);
  }, [path]);

  return (
    <Stack spacing={3}>
      <Card>
        <CardHeader
          title="RxJS"
          action={
            <IconButton
              onClick={() => {
                setList((prev) => [...prev, crypto.randomUUID()]);
              }}
            >
              <Add />
            </IconButton>
          }
        />
        <CardContent>
          <Grid container spacing={1.5}>
            <Grid size={12}>
              <Button
                variant="outlined"
                startIcon={<Stop />}
                onClick={() => {
                  path$.complete();
                }}
              >
                stop
              </Button>
            </Grid>
            <Grid size={12}>
              <TextField
                value={path}
                onChange={(e) => {
                  setPath(e.target.value);
                }}
                fullWidth
                select
              >
                <MenuItem value="com1">COM1</MenuItem>
                <MenuItem value="com2">COM2</MenuItem>
                <MenuItem value="com3">COM3</MenuItem>
              </TextField>
            </Grid>
            <Grid size={12}>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {list.map((item) => (
                  <TestItem
                    onClick={() => {
                      setList((prev) =>
                        prev.filter((i) => !Object.is(i, item)),
                      );
                    }}
                    key={item}
                  ></TestItem>
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <AutoSubmitForm enabled />
    </Stack>
  );
};
