import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import {
  amber,
  blue,
  brown,
  cyan,
  green,
  indigo,
  orange,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import React from "react";

const colors = [
  blue[500],
  green[500],
  red[500],
  indigo[500],
  orange[500],
  yellow[500],
  amber[500],
  teal[500],
  cyan[500],
  brown[500],
];

const ToggleAnimate = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <>
      <CardActions>
        <Button
          onClick={() => {
            React.startTransition(() => {
              setIsVisible((isVisible) => !isVisible);
            });
          }}
        >
          Click me
        </Button>
      </CardActions>
      <React.Activity mode={isVisible ? "visible" : "hidden"}>
        <React.ViewTransition>
          <CardContent>
            <p>
              This is a simple example of a view transition. Click the button
              below to toggle the visibility of this card.
            </p>
          </CardContent>
        </React.ViewTransition>
      </React.Activity>
    </>
  );
};

export const Component = () => {
  const [tab, setTab] = React.useState("toggle");

  const renderTabContent = () => {
    switch (tab) {
      case "toggle":
        return <ToggleAnimate />;
      case "order":
        return <OrderAnimate />;
      case "layout":
        return <LayoutAnimate />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Card>
        <Tabs
          value={tab}
          onChange={(_, v) => {
            setTab(v);
          }}
        >
          <Tab label="toggle" value="toggle" />
          <Tab label="order" value="order" />
          <Tab label="layout" value="layout" />
        </Tabs>
        {renderTabContent()}
      </Card>
    </Box>
  );
};

const LayoutAnimate = () => {
  const [s1, setS1] = React.useState(true);
  const [s2, setS2] = React.useState(true);
  const [s3, setS3] = React.useState(true);

  const ds1 = React.useDeferredValue(s1);
  const ds2 = React.useDeferredValue(s2);
  const ds3 = React.useDeferredValue(s3);

  return (
    <CardContent>
      <Stack spacing={1}>
        <React.Activity mode={ds1 ? "visible" : "hidden"}>
          <React.ViewTransition>
            <Box
              sx={{
                backgroundColor: blue[500],
                height: 48,
              }}
            >
              <button
                onClick={() => {
                  setS1(false);
                }}
              >
                click
              </button>
            </Box>
          </React.ViewTransition>
        </React.Activity>
        <Box
          sx={{
            backgroundColor: cyan[500],
            height: 48,
          }}
        ></Box>
        {ds2 && (
          <React.ViewTransition>
            <Box
              sx={{
                backgroundColor: red[500],
                height: 48,
              }}
            >
              <button
                onClick={() => {
                  setS2(false);
                }}
              >
                click
              </button>
            </Box>
          </React.ViewTransition>
        )}
        {ds3 && (
          <React.ViewTransition>
            <Box
              sx={{
                backgroundColor: green[500],
                height: 48,
              }}
            >
              <button
                onClick={() => {
                  setS3(false);
                }}
              >
                click
              </button>
            </Box>
          </React.ViewTransition>
        )}
      </Stack>
    </CardContent>
  );
};

const OrderAnimate = () => {
  const [items, setItems] = React.useState(() => {
    return Array.from({ length: 10 }, (_, i) => i + 1);
  });

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent></CardContent>
        <CardActions>
          <Button
            onClick={() => {
              React.startTransition(() => {
                setItems((prev) => prev.toReversed());
              });
            }}
          >
            Click me
          </Button>
        </CardActions>
      </Card>
      {items.map((item) => (
        <React.ViewTransition key={item}>
          <Box
            sx={{
              marginBottom: 1,
              backgroundColor: colors[item - 1],
              height: 40,
              padding: 1,
              borderRadius: 1,
            }}
          >
            <button
              onClick={() => {
                React.startTransition(() => {
                  setItems((p) => p.filter((i) => !Object.is(i, item)));
                });
              }}
            >
              {item}
            </button>
          </Box>
        </React.ViewTransition>
      ))}
    </Stack>
  );
};
