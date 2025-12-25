import { Lightbulb, LightbulbOutlined } from "@mui/icons-material";
import { Switch } from "@mui/material";
import React from "react";

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
    </>
  );
};
