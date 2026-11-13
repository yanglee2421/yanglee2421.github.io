import { Box, ButtonBase, useTheme } from "@mui/material";
import React from "react";

const initialList = () => {
  return Array.from({ length: 10 }, (_, index) => index + 1);
};

export const Component = () => {
  const [list, setList] = React.useState(initialList);

  const id = React.useId();

  const theme = useTheme();

  return (
    <div>
      <TestDemo />
      <UpdateLifecycle
        getSnapshotBeforeUpdate={() => {}}
        componentDidUpdate={() => {}}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
                onClick={() => {
                  setTimeout(() => {
                    setList((p) => p.filter((el) => !Object.is(el, i)));
                  }, 200);
                }}
              >
                {i}
              </ButtonBase>
            );
          })}
        </Box>
      </UpdateLifecycle>
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

interface UpdateLifecycleProps {
  getSnapshotBeforeUpdate: () => void;
  componentDidUpdate: () => void;
  children?: React.ReactNode;
}

class UpdateLifecycle extends React.Component<UpdateLifecycleProps> {
  constructor(props: UpdateLifecycleProps) {
    super(props);
  }

  render() {
    return this.props.children;
  }

  getSnapshotBeforeUpdate() {
    this.props.getSnapshotBeforeUpdate();
  }
  componentDidUpdate() {
    this.props.componentDidUpdate();
  }
}
