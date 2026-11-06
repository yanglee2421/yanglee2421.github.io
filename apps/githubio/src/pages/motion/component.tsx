import { CssBaseline } from "@mui/material";
import {
  AnimatePresence,
  motion,
  Reorder,
  useDragControls,
} from "motion/react";
import React from "react";

export const Component = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div>
      <CssBaseline />
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
        style={{
          height: "100dvh",
          overflow: "hidden",

          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <button onClick={() => setCollapsed(!collapsed)}>Toggle</button>

        <motion.span
          animate={{
            opacity: collapsed ? 0 : 1,
            x: collapsed ? -10 : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          Dashboard
        </motion.span>
      </motion.aside>
      <motion.div
        animate={{
          paddingInlineStart: collapsed ? 64 : 240,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        <List />
      </motion.div>
    </div>
  );
};

function List() {
  const [items, setItems] = React.useState(["A", "B", "C", "D"]);

  return (
    <div>
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item}
            layout
            transition={{
              layout: { duration: 0.2 },
            }}
          >
            {item}
            <button
              onClick={() => setItems((list) => list.filter((x) => x !== item))}
            >
              删除
            </button>
          </motion.div>
        ))}
        <ReoderExample />
      </AnimatePresence>
    </div>
  );
}

const ReoderExample = () => {
  const [items, setItems] = React.useState([0, 1, 2, 3]);

  return (
    <Reorder.Group values={items} onReorder={setItems}>
      {items.map((item) => (
        <Item key={item} value={item} />
      ))}
    </Reorder.Group>
  );
};

interface ItemProps {
  value: number;
}

const Item = (props: ItemProps) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={props.value}
      dragListener={false}
      dragControls={controls}
    >
      <div
        onPointerDown={(e) => controls.start(e)}
        style={{
          height: 50,
          border: "1px solid #ccc",
        }}
      >
        {props.value}
      </div>
    </Reorder.Item>
  );
};
