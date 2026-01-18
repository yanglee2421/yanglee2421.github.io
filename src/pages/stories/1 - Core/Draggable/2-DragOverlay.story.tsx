import { Link, Grid as MuiGrid } from "@mui/material";
import React from "react";
import { Link as RouterLink, useParams } from "react-router";
import { DndContext, useDraggable } from "@dnd-kit/core";
import {
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { Axis, Draggable, DraggableOverlay, Wrapper } from "../../components";
import type { DropAnimation, Modifiers, Translate } from "@dnd-kit/core";

interface Props {
  axis?: string;
  dragOverlayModifiers?: Modifiers;
  dropAnimation?: DropAnimation | null;
  handle?: boolean;
  label?: string;
  modifiers?: Modifiers;
  style?: React.CSSProperties;
}

export const DragOverlayExample = ({
  axis,
  dropAnimation,
  handle,
  label,
  modifiers,
}: Props) => {
  return (
    <DndContext modifiers={modifiers}>
      <Wrapper>
        <DraggableItem axis={axis} handle={handle} label={label} />
      </Wrapper>
      <DraggableOverlay axis={axis} dropAnimation={dropAnimation} />
    </DndContext>
  );
};

interface DraggableItemProps {
  axis?: string;
  label?: string;
  handle?: boolean;
  translate?: Translate;
}

const DraggableItem = ({ axis, label }: DraggableItemProps) => {
  const { setNodeRef, listeners, isDragging } = useDraggable({
    id: "draggable-item",
  });

  return (
    <Draggable
      ref={setNodeRef}
      label={label}
      axis={axis}
      dragging={isDragging}
      listeners={listeners}
      style={{
        opacity: isDragging ? 0.5 : undefined,
      }}
    />
  );
};

const BasicSetup = () => (
  <DragOverlayExample label="Drag me to see the <DragOverlay>" />
);

const DisableDropAnimation = () => (
  <DragOverlayExample label="Drop animation disabled" dropAnimation={null} />
);

const HorizontalAxis = () => (
  <DragOverlayExample
    label="I'm only draggable horizontally"
    axis={Axis.Horizontal}
    modifiers={[restrictToHorizontalAxis]}
  />
);

const VerticalAxis = () => (
  <DragOverlayExample
    label="I'm only draggable vertically"
    axis={Axis.Vertical}
    modifiers={[restrictToVerticalAxis]}
  />
);

const RestrictToWindowEdges = () => (
  <DragOverlayExample
    label="I'm only draggable within the window bounds"
    modifiers={[restrictToWindowEdges]}
  />
);

const FALLBACK_TAB = "Basic Setup";

const createTabNodeMap = () => {
  const map = new Map<string, React.ReactNode>();

  map.set(FALLBACK_TAB, <BasicSetup />);
  map.set("Disable Drop Animation", <DisableDropAnimation />);
  map.set("Horizontal Axis", <HorizontalAxis />);
  map.set("Vertical Axis", <VerticalAxis />);
  map.set("Restrict To Window Edges", <RestrictToWindowEdges />);

  return map;
};

export const Component = () => {
  const params = useParams();

  const tabToNode = createTabNodeMap();
  const tab = params.tab || FALLBACK_TAB;

  return (
    <>
      <MuiGrid container>
        {Array.from(tabToNode.keys(), (key) => (
          <MuiGrid key={key} size={{ xs: 12, sm: 6, md: 4 }}>
            <Link
              component={RouterLink}
              to={{
                pathname: `/${params.lang}/dragoverlay/${key}`,
              }}
              color={Object.is(tab, key) ? "secondary" : "primary"}
              sx={{ textTransform: "capitalize" }}
            >
              {key.split("-").join(" ")}
            </Link>
          </MuiGrid>
        ))}
      </MuiGrid>
      {tabToNode.get(tab) || <BasicSetup />}
    </>
  );
};
