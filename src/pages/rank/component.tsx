import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Box, Divider, Typography } from "@mui/material";
import type React from "react";
import { useImmer } from "use-immer";

const initDroppableList = () => [
  {
    id: "1",
    label: "S",
    children: [],
  },
  {
    id: "2",
    label: "A",
    children: [],
  },
  {
    id: "3",
    label: "B",
    children: [],
  },
  {
    id: "4",
    label: "C",
    children: [],
  },
  {
    id: "5",
    label: "D",
    children: [
      {
        id: "1",
        label: "one",
      },
    ],
  },
];

export const Component = () => {
  const [droppableList, setDroppableList] = useImmer(initDroppableList);

  return (
    <DndContext
      onDragEnd={(e) => {
        setDroppableList((draft) => {
          const { active, over } = e;
          const currentDroppable = draft.find((i) => i.id === over?.id);
          if (!currentDroppable) return;
          const allChilds = draft.flatMap((i) => i.children);
          draft.forEach((i) => {
            i.children = [];
          });
          currentDroppable.children = allChilds.filter(
            (i) => i.id === active.id,
          );
        });
      }}
    >
      {droppableList.map((droppable) => (
        <DroppableItem
          key={droppable.id}
          id={droppable.id}
          label={droppable.label}
        >
          {droppable.children.map((item) => (
            <DraggableItem key={item.id} id={item.id}>
              {item.label}
            </DraggableItem>
          ))}
        </DroppableItem>
      ))}
    </DndContext>
  );
};

type DraggableItemProps = {
  id: string;
  children?: React.ReactNode;
};

const DraggableItem = (props: DraggableItemProps) => {
  const draggable = useDraggable({
    id: props.id,
  });

  console.log(CSS.Transform.toString(draggable.transform));

  const transformString = {
    ...draggable.transform,
    x: draggable.transform?.x ? draggable.transform.x : 0,
    y: draggable.transform?.y ? draggable.transform.y : 0,
    scaleX: 1,
    scaleY: 1,
  };

  return (
    <Box
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      sx={{
        border: 1,
        borderRadius: 1,
        padding: 3,

        width: 96,
        height: 96,

        cursor: "move",
      }}
      style={{
        transform: CSS.Transform.toString(transformString),
      }}
    >
      {props.children}
    </Box>
  );
};

type DroppableItemProps = {
  id: string;
  label?: React.ReactNode;
  children?: React.ReactNode;
};

const DroppableItem = (props: DroppableItemProps) => {
  const droppable = useDroppable({
    id: props.id,
  });

  return (
    <Box ref={droppable.setNodeRef}>
      <Typography variant="h4">{props.label}</Typography>
      <Box sx={{ height: 100 }}>{props.children}</Box>
      <Divider />
    </Box>
  );
};
