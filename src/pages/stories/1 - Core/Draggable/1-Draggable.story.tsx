import {
  DndContext,
  useDraggable,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensors,
  useDndMonitor,
} from "@dnd-kit/core";
import {
  createSnapModifier,
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
  restrictToWindowEdges,
  snapCenterToCursor,
} from "@dnd-kit/modifiers";
import { Grid as MuiGrid, Link } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router";
import React from "react";
import {
  Axis,
  Draggable,
  Grid,
  OverflowWrapper,
  Wrapper,
} from "../../components";
import type { DragPendingEvent, Modifiers } from "@dnd-kit/core";
import type { Coordinates } from "@dnd-kit/utilities";
import type { PointerActivationConstraint } from "@dnd-kit/core";
import { createPortal } from "react-dom";

const defaultCoordinates: Coordinates = { x: 0, y: 0 };

interface Props {
  activationConstraint?: PointerActivationConstraint;
  axis?: string;
  handle?: boolean;
  modifiers?: Modifiers;
  buttonStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  label?: string;
  showConstraintCue?: boolean;
}

const DraggableStory = ({
  activationConstraint,
  axis,
  handle,
  label = "Go ahead, drag me.",
  modifiers,
  style,
  buttonStyle,
  showConstraintCue,
}: Props) => {
  const [{ x, y }, setCoordinates] =
    React.useState<Coordinates>(defaultCoordinates);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint,
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint,
  });

  const keyboardSensor = useSensor(KeyboardSensor, {});

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const Item = showConstraintCue ? DraggableItemWithVisualCue : DraggableItem;

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={({ delta }) => {
        setCoordinates(({ x, y }) => {
          return {
            x: x + delta.x,
            y: y + delta.y,
          };
        });
      }}
      modifiers={modifiers}
    >
      <Wrapper>
        <Item
          axis={axis}
          label={label}
          handle={handle}
          top={y}
          left={x}
          style={style}
          buttonStyle={buttonStyle}
        />
      </Wrapper>
    </DndContext>
  );
};

interface DraggableItemProps {
  label: string;
  handle?: boolean;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  axis?: string;
  top?: number;
  left?: number;
}

const DraggableItem = ({
  axis,
  label,
  style,
  top,
  left,
  handle,
  buttonStyle,
}: DraggableItemProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id: "draggable",
    });

  return (
    <Draggable
      ref={setNodeRef}
      dragging={isDragging}
      handle={handle}
      label={label}
      listeners={listeners}
      style={{ ...style, top, left }}
      buttonStyle={buttonStyle}
      transform={transform}
      axis={axis}
      {...attributes}
    />
  );
};

const DraggableItemWithVisualCue = (props: DraggableItemProps) => {
  const [isPending, setIsPending] = React.useState(false);
  const [pendingDelayMs, setPendingDelay] = React.useState(0);
  const [distanceCue, setDistanceCue] = React.useState<
    (Coordinates & { size: number }) | null
  >(null);

  const distanceCueRef = React.useRef<HTMLDivElement>(null);

  const { attributes, isDragging, listeners, node, setNodeRef, transform } =
    useDraggable({ id: "draggable" });

  const handlePending = React.useCallback(
    (event: DragPendingEvent) => {
      setIsPending(true);
      const { constraint } = event;
      if ("delay" in constraint) {
        setPendingDelay(constraint.delay);
      }
      if ("distance" in constraint && typeof constraint.distance === "number") {
        const { distance } = constraint;
        if (event.offset === undefined && node.current !== null) {
          // Infer the position of the pointer relative to the element.
          // Only do this once at the start, as the offset is defined
          // when the pointer moves.
          const { x: rx, y: ry } = node.current.getBoundingClientRect();
          setDistanceCue({
            x: event.initialCoordinates.x - rx - distance,
            y: event.initialCoordinates.y - ry - distance,
            size: distance * 2,
          });
        }
        if (distanceCueRef.current === null) {
          return;
        }
        const { x, y } = event.offset ?? { x: 0, y: 0 };
        const length = Math.sqrt(x * x + y * y);
        const ratio = length / Math.max(distance, 1);
        const fanAngle = 360 * (1 - ratio);
        const rotation = Math.atan2(y, x) * (180 / Math.PI) - 90 - fanAngle / 2;
        const { style } = distanceCueRef.current;
        style.setProperty(
          "background-image",
          `conic-gradient(red ${fanAngle}deg, transparent 0deg)`,
        );
        style.setProperty("rotate", `${rotation}deg`);
        style.setProperty("opacity", `${0.25 + ratio * 0.75}`);
      }
    },
    [node],
  );

  const handlePendingEnd = React.useCallback(() => setIsPending(false), []);

  useDndMonitor({
    onDragPending: handlePending,
    onDragAbort: handlePendingEnd,
    onDragCancel: handlePendingEnd,
    onDragEnd: handlePendingEnd,
  });

  const pendingStyle: React.CSSProperties = isPending
    ? { animationDuration: `${pendingDelayMs}ms` }
    : {};

  return (
    <>
      <Draggable
        ref={setNodeRef}
        dragging={isDragging}
        handle={props.handle}
        label={props.label}
        listeners={listeners}
        style={{ ...props.style, top: props.top, left: props.left }}
        buttonStyle={{ ...props.buttonStyle, ...pendingStyle }}
        isPendingDelay={isPending && pendingDelayMs > 0}
        transform={transform}
        axis={props.axis}
        {...attributes}
      >
        {isPending && !isDragging && distanceCue && (
          <div
            ref={distanceCueRef}
            style={{
              borderRadius: "50%",
              position: "absolute",
              backgroundImage: "conic-gradient(red 360deg, transparent 0deg)",
              opacity: 0.25,
              width: distanceCue.size,
              height: distanceCue.size,
              left: distanceCue.x,
              top: distanceCue.y,
            }}
          ></div>
        )}
      </Draggable>
    </>
  );
};

const BasicSetup = () => <DraggableStory />;

const DragHandle = () => {
  return <DraggableStory handle label="Drag with the handle" />;
};

const PressDelay = () => (
  <DraggableStory
    label="Hold me to drag"
    activationConstraint={{
      delay: 250,
      tolerance: 5,
    }}
  />
);

const PressDelayOrDistance = () => (
  <DraggableStory
    label="Activated dragging 3px or holding 250ms"
    activationConstraint={{
      delay: 250,
      distance: 3,
      tolerance: 10,
    }}
  />
);

const PressDelayWithVisualCue = () => {
  const args = { delay: 500, tolerance: 5 };

  return (
    <DraggableStory
      label={`Press and hold for ${args.delay}ms to drag`}
      activationConstraint={args}
      showConstraintCue={true}
    />
  );
};

const MinimumDistance = () => (
  <DraggableStory
    label="I'm activated after dragging 15px"
    activationConstraint={{
      distance: 15,
    }}
  />
);

const MinimumDistanceWithVisualCue = () => {
  const args = { distance: 60 };

  return (
    <DraggableStory
      label={`I'm activated after dragging ${args.distance}px`}
      activationConstraint={{ distance: args.distance }}
      showConstraintCue={true}
    />
  );
};

const MinimumDistanceX = () => {
  return (
    <DraggableStory
      label="I'm activated after dragging 15px on the x axis"
      activationConstraint={{
        distance: { x: 15 },
      }}
    />
  );
};

const MinimumDistanceY = () => (
  <DraggableStory
    label="I'm activated after dragging 15px on the y axis"
    activationConstraint={{
      distance: { y: 15 },
    }}
  />
);

const MinimumDistanceXY = () => (
  <DraggableStory
    label="I'm activated after dragging 15px on the x and y axis"
    activationConstraint={{
      distance: { x: 15, y: 15 },
    }}
  />
);

const MinimumDistanceXToleranceY = () => (
  <DraggableStory
    label="I'm activated after dragging 15px on the x axis and aborted after dragging 30px on the y axis"
    activationConstraint={{
      distance: { x: 15 },
      tolerance: { y: 30 },
    }}
  />
);

const MinimumDistanceYToleranceX = () => (
  <DraggableStory
    label="I'm activated after dragging 15px on the y axis and aborted after dragging 30px on the x axis"
    activationConstraint={{
      distance: { y: 15 },
      tolerance: { x: 30 },
    }}
  />
);

const HorizontalAxis = () => (
  <DraggableStory
    label="Draggable horizontally"
    axis={Axis.Horizontal}
    modifiers={[restrictToHorizontalAxis]}
  />
);

const VerticalAxis = () => (
  <DraggableStory
    label="Draggable vertically"
    axis={Axis.Vertical}
    modifiers={[restrictToVerticalAxis]}
  />
);

const RestrictToWindowEdges = () => (
  <OverflowWrapper>
    <DraggableStory
      label="I'm only draggable within the window bounds"
      modifiers={[restrictToWindowEdges]}
    />
  </OverflowWrapper>
);

const SnapToGrid = () => {
  const [gridSize, setGridSize] = React.useState(30);
  const style = {
    alignItems: "flex-start",
  };
  const buttonStyle = {
    marginLeft: gridSize - 20 + 1,
    marginTop: gridSize - 20 + 1,
    width: gridSize * 8 - 1,
    height: gridSize * 2 - 1,
  };
  const snapToGrid = React.useMemo(
    () => createSnapModifier(gridSize),
    [gridSize],
  );

  return (
    <>
      <DraggableStory
        label={`Snapping to ${gridSize}px increments`}
        modifiers={[snapToGrid]}
        style={style}
        buttonStyle={buttonStyle}
        key={gridSize}
      />
      <Grid size={gridSize} onSizeChange={setGridSize} />
    </>
  );
};

const SnapCenterToCursor = () => (
  <DraggableStory
    label="When you grab me, my center will move to where the cursor is."
    modifiers={[snapCenterToCursor]}
  />
);

const createTabNodeMap = () => {
  const map = new Map<string, React.ReactNode>();

  map.set("basic-setup", <BasicSetup />);
  map.set("drag-handle", <DragHandle />);
  map.set("press-delay", <PressDelay />);
  map.set("press-delay-or-distance", <PressDelayOrDistance />);
  map.set("press-delay-with-visual-cue", <PressDelayWithVisualCue />);
  map.set("minimum-distance", <MinimumDistance />);
  map.set("minimum-distance-with-visual-cue", <MinimumDistanceWithVisualCue />);
  map.set("minimum-distance-x", <MinimumDistanceX />);
  map.set("minimum-distance-y", <MinimumDistanceY />);
  map.set("minimum-distance-x-y", <MinimumDistanceXY />);
  map.set("minimum-distance-x-tolerance-y", <MinimumDistanceXToleranceY />);
  map.set("minimum-distance-y-tolerance-x", <MinimumDistanceYToleranceX />);
  map.set("horizontal-axis", <HorizontalAxis />);
  map.set("vertical-axis", <VerticalAxis />);
  map.set(
    "restrict-to-window-edges",
    createPortal(<RestrictToWindowEdges />, document.body),
  );
  map.set("snap-to-grid", <SnapToGrid />);
  map.set("Snap-Center-To-Cursor", <SnapCenterToCursor />);

  return map;
};

export const Component = () => {
  const params = useParams();

  const tabToNode = createTabNodeMap();
  const fallbackTab = "basic-setup";
  const tab = params.tab || fallbackTab;

  return (
    <>
      <MuiGrid container>
        {Array.from(tabToNode.keys(), (key) => (
          <MuiGrid key={key} size={{ xs: 12, sm: 6, md: 4 }}>
            <Link
              component={RouterLink}
              to={{
                pathname: `/${params.lang}/dnd/${key}`,
              }}
              color={Object.is(tab, key) ? "secondary" : "primary"}
              sx={{ textTransform: "capitalize" }}
            >
              {key.split("-").join(" ")}
            </Link>
          </MuiGrid>
        ))}
      </MuiGrid>

      {tabToNode.get(tab)}
    </>
  );
};
