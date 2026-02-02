import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  pointerWithin,
  rectIntersection,
  defaultDropAnimation,
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
  defaultAnimateLayoutChanges,
} from "@dnd-kit/sortable";
import {
  restrictToFirstScrollableAncestor,
  restrictToWindowEdges,
  snapCenterToCursor,
} from "@dnd-kit/modifiers";
import React from "react";
import { createPortal } from "react-dom";
import { CSS } from "@dnd-kit/utilities";
import { Delete } from "@mui/icons-material";
import { indigo, red } from "@mui/material/colors";
import { alpha, Box, Stack, useTheme } from "@mui/material";
import { useResizeObserver } from "@/hooks/dom/useResizeObserver";
import type { CollisionDetection, UniqueIdentifier } from "@dnd-kit/core";
import type { AnimateLayoutChanges } from "@dnd-kit/sortable";

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

const collisionDetection: CollisionDetection = (args) => {
  if (args.pointerCoordinates) {
    return pointerWithin(args);
  }

  return rectIntersection(args);
};

const mapInitializer = () => {
  const map = new Map<UniqueIdentifier, UniqueIdentifier[]>();

  map.set("one", [1, 2, 3, 4, 5, 6]);
  map.set("two", [11, 12, 13, 14, 15, 16]);
  map.set("three", [21, 22, 23, 24, 25, 26]);

  return map;
};

/**
 * If remove cause is not dragging need this function
 */
// const animateLayoutChanges: AnimateLayoutChanges = (args) => {
//   return defaultAnimateLayoutChanges({ ...args, wasDragging: true });
// };

const arrayDelete = (array: UniqueIdentifier[], id: UniqueIdentifier) => {
  return array.filter((el) => !Object.is(el, id));
};

const animateLayoutChanges: AnimateLayoutChanges = (args) => {
  const result = defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  return result;
};

const TRASH_ID = "TRASH_ID";

type SortableItemProps = {
  id: UniqueIdentifier;
  containerId: UniqueIdentifier;
  onRemove?: () => void;
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
    animateLayoutChanges,
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
        touchAction: "none",

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
      onContextMenu={(e) => {
        e.preventDefault();
        props.onRemove?.();
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
        gridTemplateColumns: {
          xs: "repeat(2,minmax(0,1fr))",
          sm: "repeat(3,minmax(0,1fr))",
          md: "repeat(4,minmax(0,1fr))",
          lg: "repeat(5,minmax(0,1fr))",
          xl: "repeat(6,minmax(0,1fr))",
        },
        gap: 1.5,
        minBlockSize: 160,
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

type TrashProps = {
  id: string;
};

const Trash = (props: TrashProps) => {
  const theme = useTheme();

  const droppable = useDroppable({
    id: props.id,
    data: {
      containerId: props.id,
    },
  });

  return createPortal(
    <div
      ref={(el) => {
        droppable.setNodeRef(el);

        return () => {
          droppable.setNodeRef(null);
        };
      }}
      style={{
        position: "fixed",
        insetInline: 0,
        top: 0,
        zIndex: 9999,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        height: 200,

        backgroundColor: droppable.isOver
          ? alpha(red[500], 1 - theme.palette.action.activatedOpacity)
          : alpha(red[500], 1 - theme.palette.action.disabledOpacity),
      }}
    >
      <Delete fontSize="large" color="inherit" />
    </div>,
    document.body,
  );
};

export const Component = () => {
  const [map, setMap] = React.useState(mapInitializer);
  const [backupMap, setBackupMap] = React.useState(mapInitializer);
  const [activatedId, setActivatedId] = React.useState<UniqueIdentifier>(0);
  const [width, setWidth] = React.useState(0);
  const [enableDropAnimation, setEnableDropAnimation] = React.useState(false);

  const timerRef = React.useRef(0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleRemove = (
    activeContainer: UniqueIdentifier,
    id: UniqueIdentifier,
  ) => {
    cancelAnimationFrame(timerRef.current);
    timerRef.current = requestAnimationFrame(() => {
      timerRef.current = requestAnimationFrame(() => {
        timerRef.current = requestAnimationFrame(() => {
          setMap((prev) => {
            const nextMap = new Map(prev);
            const activeItems = nextMap.get(activeContainer) || [];

            nextMap.set(activeContainer, arrayDelete(activeItems, id));

            return nextMap;
          });
        });
      });
    });
  };

  return (
    <DndContext
      onDragStart={(e) => {
        if (!e.active) return;

        setActivatedId(e.active.id);
        setWidth(e.active.data.current?.width || 0);
        setBackupMap(map);
        setEnableDropAnimation(true);
      }}
      onDragOver={({ active, over }) => {
        if (!over) return;

        const activeId = active.id;
        const activeContainer = calculateContainerId(active.data.current);
        if (!activeContainer) return;

        const overContainer = calculateContainerId(over.data.current);
        if (!overContainer) return;

        if (overContainer === TRASH_ID) {
          return;
        }

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
        setActivatedId(0);

        if (!over) return;

        const activeContainer = calculateContainerId(active.data.current);
        if (!activeContainer) return;

        const overContainer = calculateContainerId(over.data.current);
        if (!overContainer) return;

        if (overContainer === TRASH_ID) {
          handleRemove(activeContainer, activatedId);
          setEnableDropAnimation(false);
          return;
        }

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
      collisionDetection={collisionDetection}
      sensors={sensors}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
    >
      {!!activatedId && <Trash id={TRASH_ID} />}
      <Stack spacing={3}>
        <div style={{ height: 50 }}></div>
        {Array.from(map.keys(), (containerId) => {
          const items = Array.from(map.get(containerId) || []);

          return (
            <DroppableContainer key={containerId} id={containerId}>
              <SortableContext items={items} strategy={rectSortingStrategy}>
                {items.map((id) => (
                  <SortableItem
                    key={id}
                    id={id}
                    containerId={containerId}
                    onRemove={() => {
                      handleRemove(containerId, id);
                    }}
                  />
                ))}
              </SortableContext>
            </DroppableContainer>
          );
        })}
      </Stack>
      {createPortal(
        <DragOverlay
          dropAnimation={enableDropAnimation ? defaultDropAnimation : null}
        >
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
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};
