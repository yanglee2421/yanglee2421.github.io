import React from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import { Box, Stack } from "@mui/material";
import { CSS } from "@dnd-kit/utilities";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { createPortal } from "react-dom";
import { devLog } from "@/lib/utils";
import type { UniqueIdentifier } from "@dnd-kit/core";

const mapInitializer = () => {
  const map = new Map<UniqueIdentifier, UniqueIdentifier[]>();

  map.set("one", [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  map.set("two", [11, 12, 13, 14, 15, 16, 17, 18, 19]);

  return map;
};

const calculateContainerId = (data: unknown) => {
  const containerId = Reflect.get(Object(data), "containerId");

  if (typeof containerId !== "string") {
    return null;
  }

  return containerId;
};

export const Component = () => {
  const [map, setMap] = React.useState(mapInitializer);
  const [backupMap, setBackupMap] = React.useState(mapInitializer);
  const [activatedId, setActivatedId] = React.useState<UniqueIdentifier>(0);
  const [width, setWidth] = React.useState(0);

  const sensors = useSensors(
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor),
  );

  return (
    <DndContext
      onDragStart={(e) => {
        devLog(false, e);
        if (!e.active) return;

        setActivatedId(e.active.id);
        setBackupMap(map);
        setWidth(e.active.data.current?.width || 0);
      }}
      onDragOver={({ active, over }) => {
        devLog(true, active, over);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;
        const activeContainer = calculateContainerId(active.data.current);
        const overContainer = calculateContainerId(over.data.current);

        if (!overContainer) return;
        if (!activeContainer) return;
        if (activeContainer === overContainer) return;

        if (overId === overContainer) {
          setMap((prev) => {
            const nextMap = new Map(prev);
            devLog(false, activeContainer, overContainer, activeId, overId);

            const activeItems = map.get(activeContainer) || [];

            nextMap.set(
              activeContainer,
              activeItems.filter((id) => !Object.is(id, activeId)),
            );

            const oldOverItems = map.get(overContainer) || [];
            const nextOverItems = [...oldOverItems, activeId];

            nextMap.set(overContainer, nextOverItems);

            return nextMap;
          });
          return;
        }

        devLog(true, activeContainer, overContainer, activeId, overId);

        setMap((prev) => {
          const nextMap = new Map(prev);

          const activeItems = map.get(activeContainer) || [];

          nextMap.set(
            activeContainer,
            activeItems.filter((id) => !Object.is(id, activeId)),
          );

          const oldOverItems = map.get(overContainer) || [];
          const newIndex = oldOverItems.indexOf(overId);
          const nextOverItems = [
            ...oldOverItems.slice(0, newIndex),
            activeId,
            ...oldOverItems.slice(newIndex, oldOverItems.length),
          ];

          nextMap.set(overContainer, nextOverItems);

          return nextMap;
        });
      }}
      onDragEnd={({ active, over }) => {
        devLog(false, "drag end", active, over);
        if (!over) return;

        setMap((prev) => {
          const nextMap = new Map(prev);
          const activeContainer = calculateContainerId(active.data.current);
          const overContainer = calculateContainerId(over.data.current);

          if (!activeContainer) return prev;
          if (!overContainer) return prev;

          const activeItems = nextMap.get(activeContainer) || [];
          const fromIndex = activeItems.indexOf(active.id);
          const toIndex = activeItems.indexOf(over.id);

          devLog(false, fromIndex, toIndex, activeItems);

          nextMap.set(
            activeContainer,
            arrayMove(activeItems, fromIndex, toIndex),
          );

          return nextMap;
        });
      }}
      onDragCancel={() => {
        devLog(true, "cancel ");
        setActivatedId(0);
        setMap(backupMap);
        setWidth(0);
      }}
      modifiers={[restrictToWindowEdges]}
      sensors={sensors}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
    >
      <Stack spacing={3}>
        {Array.from(map.keys(), (containerId) => {
          const items = Array.from(map.get(containerId) || []);

          return (
            <DroppableContainer key={containerId} id={containerId}>
              <SortableContext items={items} strategy={rectSortingStrategy}>
                {items.map((id) => (
                  <SortableItem key={id} id={id} containerId={containerId} />
                ))}
              </SortableContext>
            </DroppableContainer>
          );
        })}
      </Stack>
      {createPortal(
        <DragOverlay>
          {activatedId ? (
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.error.main,
                aspectRatio: "1/1",
                borderRadius: 1,
                width,
                borderStyle: "solid",
                borderColor: "primary.main",
                borderWidth: 2,
                "&:focus-visible": {
                  borderColor: "info.main",
                  borderWidth: 2,
                },
              }}
            >
              {activatedId}
            </Box>
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};

const calculateIsHTMLEl = (el: unknown): el is HTMLElement => {
  return el instanceof HTMLElement;
};

type SortableItemProps = {
  id: UniqueIdentifier;
  containerId: UniqueIdentifier;
};

const SortableItem = (props: SortableItemProps) => {
  const [width, setWidth] = React.useState(0);

  const sortable = useSortable({
    id: props.id,
    data: {
      width: width,
      containerId: props.containerId,
    },
  });

  const changeWidth = React.useEffectEvent((observer: ResizeObserver) => {
    const el = sortable.node.current;
    if (!el) return;

    observer.observe(el);
  });

  React.useEffect(() => {
    const observer = new ResizeObserver(
      ([
        {
          borderBoxSize: [{ inlineSize }],
        },
      ]) => {
        setWidth(inlineSize);
      },
    );
    changeWidth(observer);

    return () => {
      observer.disconnect();
    };
  }, []);

  devLog(false, sortable);

  return (
    <Box
      ref={(el) => {
        const isHTMLEl = calculateIsHTMLEl(el);
        if (!isHTMLEl) return;

        sortable.setNodeRef(el);

        return () => {
          sortable.setNodeRef(null);
        };
      }}
      {...sortable.attributes}
      {...sortable.listeners}
      component={"div"}
      style={{
        transform: CSS.Transform.toString(sortable.transform),
        transition: sortable.transition,
      }}
      sx={{
        bgcolor: (theme) => theme.palette.error.main,
        aspectRatio: "1/1",
        borderRadius: 1,
        opacity: sortable.isDragging ? 0.5 : void 0,
        borderStyle: "solid",
        borderColor: "primary.main",
        borderWidth: Object.is(sortable.active?.id, props.id) ? 2 : 0,
        "&:focus-visible": {
          borderColor: "info.main",
          borderWidth: 2,
          outline: "none",
        },
      }}
    >
      {props.id}
    </Box>
  );
};

type DroppableContainerProps = {
  id: UniqueIdentifier;
  children?: React.ReactNode;
};

const DroppableContainer = (props: DroppableContainerProps) => {
  const droppable = useDroppable({
    id: props.id,
    data: {
      containerId: props.id,
    },
  });

  return (
    <Box
      ref={(el) => {
        const isEl = calculateIsHTMLEl(el);

        if (!isEl) return;

        droppable.setNodeRef(el);

        return () => {
          droppable.setNodeRef(null);
        };
      }}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(6,minmax(0,1fr))",
        gap: 1,
        minBlockSize: 100,
      }}
    >
      {props.children}
    </Box>
  );
};
