import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";

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
            <ListItem key={item}>
              <ListItemText primary={item} />
            </ListItem>
          </React.ViewTransition>
        ))}
      </List>
      <Card>
        <CardContent></CardContent>
        <CardActions>
          <Button
            onClick={() => {
              React.startTransition(() => {
                setItems((prev) => prev.toReversed().filter((i) => i !== 1));
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
