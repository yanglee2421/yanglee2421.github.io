import { Box, ButtonBase, useTheme } from "@mui/material";
import React from "react";

const initialList = () => {
  return Array.from({ length: 10 }, (_, index) => index + 1);
};

export const Component = () => {
  const [list, setList] = React.useState(initialList);

  const scope = React.useRef<HTMLDivElement>(null);
  const idToElRef = React.useRef<Map<string, HTMLElement>>(null);
  const idToFirstRef = React.useRef<Map<string, DOMRect>>(null);

  const theme = useTheme();

  React.useLayoutEffect(() => {
    const idToEl = idToElRef.current;
    const idToFirst = idToFirstRef.current;

    if (!idToEl) return;
    if (!idToFirst) return;

    const animations = [...idToEl].map(([id, el]) => {
      const first = idToFirst.get(id)!;
      const last = el.getBoundingClientRect();

      return el.animate(
        [
          {
            transform: `translate3d(${first.x - last.x}px,${first.y - last.y}px,0px)`,
          },
          {
            transform: `translate3d(0,0,0)`,
          },
        ],
        {
          duration: 200,
        },
      );
    });

    return () => {
      animations.forEach((ani) => {
        ani.cancel();
      });
    };
  }, [list]);

  return (
    <div>
      <Box
        className=""
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
        ref={scope}
      >
        {list.map((i) => {
          return (
            <ButtonBase
              key={i}
              sx={{
                height: 40,
                borderWidth: 1,
                borderColor: theme.palette.divider,
                borderStyle: "solid",

                lineHeight: 40 + "px",
                textIndent: 10,
              }}
              data-id={i}
              onClick={() => {
                const idToEl = new Map<string, HTMLElement>();
                const idToFirst = new Map<string, DOMRect>();
                const scopeEl = scope.current!;
                const elements = scopeEl.querySelectorAll(":scope > *");

                for (const el of elements) {
                  if (!(el instanceof HTMLElement)) {
                    continue;
                  }

                  const id = el.dataset.id;
                  if (!id) continue;

                  if (id === i.toString()) continue;

                  const point = el.getBoundingClientRect();
                  idToEl.set(id, el);
                  idToFirst.set(id, point);
                }

                idToElRef.current = idToEl;
                idToFirstRef.current = idToFirst;

                setList((p) => p.filter((el) => !Object.is(i, el)));
              }}
            >
              {i}
            </ButtonBase>
          );
        })}
      </Box>
      <TestDemo />
    </div>
  );
};

const TestDemo = () => {
  const [id, setId] = React.useState(1);

  const ref = React.useRef<HTMLButtonElement>(null);

  React.useLayoutEffect(() => {
    console.log("layout setup", ref.current?.dataset.id);

    return () => {
      console.log("clean layout", ref.current?.dataset.id);
    };
  }, [id]);

  return (
    <button
      data-id={id}
      ref={ref}
      onClick={() => {
        setId((p) => p + 1);
      }}
    >
      click me
    </button>
  );
};
