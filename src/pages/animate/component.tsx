import { Box, Button, ButtonGroup, useTheme } from "@mui/material";
import React from "react";

type Position = {
  x: number;
  y: number;
};

const listInitializer = () => Array.from({ length: 30 }, (_, index) => index);

let positions: Position[] = [];
let lastPositions: Position[] = [];

export const Component = () => {
  const [list, setList] = React.useState(listInitializer);
  const [key, setKey] = React.useState(0);

  const domsRef = React.useRef<HTMLDivElement[]>([]);

  const theme = useTheme();

  return (
    <>
      <Box sx={{ paddingBlock: 2 }}>
        <ButtonGroup>
          <Button
            onClick={() => {
              setKey((previous) => previous + 1);
              setList(listInitializer());
              domsRef.current = [];
              positions = [];
              lastPositions = [];
            }}
          >
            reset
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        key={key}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4,minmax(0,1fr))",
          gap: 1,
        }}
      >
        {list.map((id) => (
          <Box
            key={id}
            ref={(el) => {
              if (el instanceof HTMLDivElement) {
                domsRef.current.push(el);
              }
            }}
            sx={{
              aspectRatio: "1/1",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: (theme) => theme.palette.divider,

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",

              backgroundColor: theme.palette.background.paper,

              fontSize: 40,

              zIndex: id,
            }}
          >
            {id}
            <Button
              onClick={async () => {
                // Read all elements position
                positions = domsRef.current.map((el) => {
                  const { x, y } = el.getBoundingClientRect();

                  return { x, y };
                });
                domsRef.current[id].style.display = "none";
                lastPositions = domsRef.current.map((el) => {
                  const { x, y } = el.getBoundingClientRect();

                  return { x, y };
                });
                await Promise.allSettled(
                  domsRef.current.map((el, index) => {
                    if (index === id) {
                      return Promise.resolve();
                    }

                    return el.animate(
                      [
                        {
                          transform: `translate3d(${positions[index].x - lastPositions[index].x}px,${positions[index].y - lastPositions[index].y}px,0)`,
                        },
                        { transform: `translate3d(0,0,0)` },
                      ],
                      { duration: theme.transitions.duration.standard },
                    ).finished;
                  }),
                );
                setList((previous) =>
                  previous.filter((el) => !Object.is(el, id)),
                );
              }}
            >
              Click
            </Button>
          </Box>
        ))}
      </Box>
    </>
  );
};
