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
  pointerWithin,
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import React from "react";
import { createPortal } from "react-dom";
import { CSS } from "@dnd-kit/utilities";
import { Box, Stack, useTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";
import {
  restrictToFirstScrollableAncestor,
  restrictToWindowEdges,
  snapCenterToCursor,
} from "@dnd-kit/modifiers";
import { devLog } from "@/lib/utils";
import { useResizeObserver } from "@/hooks/dom/useResizeObserver";
import type { UniqueIdentifier } from "@dnd-kit/core";

const calculateContainerId = (data: unknown) => {
  const containerId = Reflect.get(Object(data), "containerId");

  if (typeof containerId !== "string") {
    return null;
  }

  return containerId;
};

const calculateIsHTMLEl = (el: unknown): el is HTMLElement => {
  return el instanceof HTMLElement;
};

const mapInitializer = () => {
  const map = new Map<UniqueIdentifier, UniqueIdentifier[]>();

  map.set("one", [1, 2, 3, 4, 5, 6]);
  map.set("two", [11, 12, 13, 14, 15, 16]);
  map.set("three", [21, 22, 23, 24, 25, 26]);

  return map;
};

type SortableItemProps = {
  id: UniqueIdentifier;
  containerId: UniqueIdentifier;
};

const SortableItem = (props: SortableItemProps) => {
  const theme = useTheme();
  const [ref, entry] = useResizeObserver();

  const width = useResizeObserver.inlineSize(entry?.borderBoxSize);

  const sortable = useSortable({
    id: props.id,
    data: {
      width: width,
      containerId: props.containerId,
    },
  });

  return (
    <Box
      ref={(el) => {
        const isHTMLEl = calculateIsHTMLEl(el);
        if (!isHTMLEl) return;

        ref.current = el;
        sortable.setNodeRef(el);

        return () => {
          ref.current = null;
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
        bgcolor: indigo[500],
        aspectRatio: "1/1",
        borderRadius: 1,
        opacity: sortable.isDragging ? 0.5 : void 0,
        borderStyle: "solid",
        borderColor: theme.palette.action.active,
        borderWidth: Object.is(sortable.active?.id, props.id) ? 2 : 0,
        "&:focus-visible": {
          borderColor: theme.palette.action.focus,
          borderWidth: 2,
          outline: "none",
        },

        fontSize: 60,
        fontWeight: 300,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        gridTemplateColumns: "repeat(4,minmax(0,1fr))",
        gap: 1.5,
        minBlockSize: 200,
        borderColor: "primary.main",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 2,

        padding: 1.5,
      }}
    >
      {props.children}
    </Box>
  );
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
        if (!over) return;

        const activeId = active.id;

        const activeContainer = calculateContainerId(active.data.current);
        if (!activeContainer) return;

        const overContainer = calculateContainerId(over.data.current);
        if (!overContainer) return;

        // Active and Over are in the same container
        if (activeContainer === overContainer) {
          return;
        }

        /**
         * Move Active to the target container
         */
        setMap((prev) => {
          const nextMap = new Map(prev);

          const activeItems = map.get(activeContainer) || [];

          nextMap.set(
            activeContainer,
            activeItems.filter((id) => !Object.is(id, activeId)),
          );

          const overItems = map.get(overContainer) || [];

          nextMap.set(
            overContainer,
            Array.from(new Set([...overItems, activeId])),
          );

          return nextMap;
        });
      }}
      onDragEnd={({ active, over }) => {
        if (!over) return;

        const activeContainer = calculateContainerId(active.data.current);
        if (!activeContainer) return;

        const overContainer = calculateContainerId(over.data.current);
        if (!overContainer) return;

        if (activeContainer !== overContainer) {
          return;
        }

        setMap((prev) => {
          const nextMap = new Map(prev);

          const activeItems = nextMap.get(activeContainer) || [];
          const fromIndex = activeItems.indexOf(active.id);
          const toIndex = activeItems.indexOf(over.id);

          nextMap.set(
            activeContainer,
            arrayMove(activeItems, fromIndex, toIndex),
          );

          return nextMap;
        });
      }}
      onDragCancel={() => {
        setActivatedId(0);
        setMap(backupMap);
        setWidth(0);
      }}
      modifiers={[
        restrictToWindowEdges,
        restrictToFirstScrollableAncestor,
        snapCenterToCursor,
      ]}
      collisionDetection={pointerWithin}
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
                bgcolor: indigo[500],
                aspectRatio: "1/1",
                borderRadius: 1,
                width,
                borderStyle: "solid",
                borderColor: (theme) => theme.palette.action.active,
                borderWidth: 2,
                "&:focus-visible": {
                  borderColor: (theme) => theme.palette.action.focus,
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
