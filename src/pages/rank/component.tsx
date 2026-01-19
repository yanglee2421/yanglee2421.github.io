import React from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { CSS } from "@dnd-kit/utilities";
import {
  restrictToWindowEdges,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { createPortal } from "react-dom";
import { devLog } from "@/lib/utils";

const itemsInitializer = () =>
  Array.from({ length: 10 }, (_, index) => index + 1);

export const Component = () => {
  const [items, setItems] =
    React.useState<UniqueIdentifier[]>(itemsInitializer);
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
        devLog(true, e);
        if (e.active) {
          setActivatedId(e.active.id);
          setWidth(e.active.data.current?.width || 0);
        }
      }}
      onDragEnd={(e) => {
        setActivatedId(0);
        setWidth(0);

        const over = e.over;
        if (!over) return;

        setItems((prev) => {
          return arrayMove(
            prev,
            prev.indexOf(e.active.id),
            prev.indexOf(over.id),
          );
        });
      }}
      onDragCancel={() => {
        setActivatedId(0);
        setWidth(0);
      }}
      modifiers={[restrictToWindowEdges, restrictToParentElement]}
      sensors={sensors}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3,minmax(0,1fr))",
          gap: 1,
        }}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>
      </Box>
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
};

const SortableItem = (props: SortableItemProps) => {
  const [width, setWidth] = React.useState(0);

  const sortable = useSortable({
    id: props.id,
    data: {
      width: width,
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

  devLog(true, sortable);

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
