import React from "react";
import { Box, Switch } from "@mui/material";
import { Lightbulb, LightbulbOutlined } from "@mui/icons-material";
import { useResizeObserver } from "@/hooks/dom/useResizeObserver";

const DemoComponent = () => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const [ref, entry] = useResizeObserver<HTMLDivElement>();

  const inlineSize = entry?.borderBoxSize.at(0)?.inlineSize || 0;
  const blockSize = entry?.borderBoxSize.at(0)?.blockSize;

  return (
    <>
      <div
        ref={ref}
        style={{
          width,
          height,
          border: "1px red solid",
          textAlign: "center",
        }}
      >
        <p>inlineSize: {inlineSize}</p>
        <p>blockSize: {blockSize}</p>
      </div>
      <Box sx={{}}>
        <button
          onClick={() => {
            setWidth((prev) => prev + 30);
          }}
        >
          width+
        </button>
        <button
          onClick={() => {
            setWidth((prev) => prev - 30);
          }}
        >
          width-
        </button>
        <button
          onClick={() => {
            setHeight((prev) => prev + 30);
          }}
        >
          height+
        </button>
        <button
          onClick={() => {
            setHeight((prev) => prev - 30);
          }}
        >
          height-
        </button>
      </Box>
    </>
  );
};

export const Component = () => {
  const [switch1On, setSwitch1On] = React.useState(false);
  const [switch2On, setSwitch2On] = React.useState(false);

  const path1Close = switch1On && !switch2On;
  const path2Close = !switch1On && switch2On;
  const lightOn = path1Close || path2Close;

  return (
    <>
      <Switch
        checked={switch1On}
        onChange={(e) => {
          setSwitch1On(e.target.checked);
        }}
      />
      <Switch
        checked={switch2On}
        onChange={(e) => {
          setSwitch2On(e.target.checked);
        }}
      />
      {lightOn ? (
        <Lightbulb fontSize="large" />
      ) : (
        <LightbulbOutlined fontSize="large" />
      )}
      <div>{path1Close && <p>path1 close</p>}</div>
      <div>{path2Close && <p>path2 close</p>}</div>
      <DemoComponent />
    </>
  );
};
