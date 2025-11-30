import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
  KeyboardSensor,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardHeader, styled, Typography } from "@mui/material";
import React from "react";
import { useImmer } from "use-immer";

const makeDragable = () => {
  return Array.from({ length: 10 }, (_, index) => {
    return {
      id: String(index + 1),
      groupId: "",
    };
  });
};

const isGroup = (id: string) => {
  return Number.isNaN(Number(id));
};

export const Component = () => {
  "use no memo";
  const [draggables, setDraggables] = useImmer(makeDragable);

  const sensors = useSensors(
    // useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const setDraggableGroup = (dragId: string, groupId: string) => {
    setDraggables((draft) => {
      const active = draft.find((drag) => Object.is(drag.id, dragId));
      if (!active) return;

      active.groupId = groupId;
    });
  };

  const setDraggableSort = (prevId: string, nextId: string) => {
    setDraggables((draft) => {
      const prevIndex = draft.findIndex((drag) => Object.is(drag.id, prevId));
      const nextIndex = draft.findIndex((drag) => Object.is(drag.id, nextId));

      return arrayMove(draft, prevIndex, nextIndex);
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(e) => {
        const { active, over } = e;

        const overId = over?.id + "";
        const activeId = active.id + "";
        const isGroupElement = isGroup(overId);

        console.log(isGroupElement, overId, activeId);

        if (isGroupElement) {
          setDraggableGroup(activeId, overId);
        } else {
          setDraggableSort(activeId, overId);
        }
      }}
    >
      <Typography variant="h2">S</Typography>
      <Group
        id="s"
        items={draggables.filter((drag) => Object.is(drag.groupId, "s"))}
      />
      <Typography variant="h2">A</Typography>
      <Group
        id="a"
        items={draggables.filter((drag) => Object.is(drag.groupId, "a"))}
      />
      <Typography variant="h2">None</Typography>
      <Group
        id=""
        items={draggables.filter((drag) => Object.is(drag.groupId, ""))}
      />
    </DndContext>
  );
};

type Item = {
  id: string;
};

type GroupProps = {
  items: Item[];
  id: string;
};

const Box = styled("div")({});

const Group = (props: GroupProps) => {
  const droppable = useDroppable({
    id: props.id,
  });

  return (
    <Box
      ref={(el) => {
        droppable.setNodeRef(el);

        return () => {
          droppable.setNodeRef(null);
        };
      }}
      sx={{
        height: 100,
        borderStyle: "solid",
        borderWidth: 1,

        display: "flex",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      <SortableContext
        strategy={horizontalListSortingStrategy}
        items={props.items}
      >
        {props.items.map((item) => (
          <Draggable key={item.id} id={item.id} title={item.id} />
        ))}
      </SortableContext>
    </Box>
  );
};

type DraggableProps = {
  id: string;
  title?: React.ReactNode;
};

const Draggable = (props: DraggableProps) => {
  const sortable = useSortable({
    id: props.id,
  });

  return (
    <Box
      ref={(el) => {
        sortable.setNodeRef(el);
        return () => {
          sortable.setNodeRef(null);
        };
      }}
      {...sortable.attributes}
      {...sortable.listeners}
      style={{
        transform: CSS.Transform.toString(sortable.transform),
      }}
      sx={{
        width: 100,
        height: 100,
      }}
    >
      <Card>
        <CardHeader title={props.title} />
      </Card>
    </Box>
  );
};
