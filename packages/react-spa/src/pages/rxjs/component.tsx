import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import React from "react";
import { NEVER, shareReplay, startWith, using } from "rxjs";

class DemoStore {
  value = 0;

  constructor() {
    this.value = Math.floor(Math.random() * 100);
  }

  open() {
    console.log("start");

    const id = setInterval(() => {
      console.log("run", this.value);
    }, 1000 * 2);

    return id;
  }

  close(id: NodeJS.Timeout) {
    console.log("closed");

    clearInterval(id);
  }
}

const shareTest$ = using(
  () => {
    const store = new DemoStore();
    const id = store.open();

    return {
      unsubscribe: () => {
        store.close(id);
      },
      store,
    };
  },
  (c) => NEVER.pipe(startWith(Reflect.get(Object(c), "store").value as number)),
).pipe(
  shareReplay({
    refCount: true,
    bufferSize: 1,
  }),
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

export const Component = () => {
  const [list, setList] = React.useState<string[]>([]);

  return (
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
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {list.map((item) => (
            <TestItem
              onClick={() => {
                setList((prev) => prev.filter((i) => !Object.is(i, item)));
              }}
              key={item}
            ></TestItem>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
