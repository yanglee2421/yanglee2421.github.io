import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  Stack,
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
      <Card>
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
      </Card>
      <React.Activity mode={isVisible ? "visible" : "hidden"}>
        <React.ViewTransition>
          <Card>
            <CardHeader title="View Transition" />
            <CardContent>
              <p>
                This is a simple example of a view transition. Click the button
                below to toggle the visibility of this card.
              </p>
            </CardContent>
          </Card>
        </React.ViewTransition>
      </React.Activity>
    </>
  );
};

export const Component = () => {
  const [items, setItems] = React.useState(() => {
    return Array.from({ length: 10 }, (_, i) => i + 1);
  });

  return (
    <Stack spacing={2}>
      <ToggleAnimate />
      <List>
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
      </List>
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
    </Stack>
  );
};
