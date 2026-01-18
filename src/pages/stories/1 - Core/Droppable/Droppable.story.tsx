import {
  closestCenter,
  closestCorners,
  rectIntersection,
  pointerWithin,
  DndContext,
  useDraggable,
} from "@dnd-kit/core";
import { Grid as MuiGrid, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink, useParams } from "react-router";
import type {
  Modifiers,
  UniqueIdentifier,
  CollisionDetection as CollisionDetectionType,
} from "@dnd-kit/core";
import {
  Draggable,
  DraggableOverlay,
  Droppable,
  GridContainer,
  Wrapper,
} from "../../components";

interface Props {
  collisionDetection?: CollisionDetectionType;
  containers?: string[];
  modifiers?: Modifiers;
  value?: string;
}

const DroppableStory = ({
  containers = ["A"],
  collisionDetection,
  modifiers,
}: Props) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [parent, setParent] = React.useState<UniqueIdentifier | null>(null);

  const item = <DraggableItem />;

  return (
    <DndContext
      collisionDetection={collisionDetection}
      modifiers={parent === null ? undefined : modifiers}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={({ over }) => {
        setParent(over ? over.id : null);
        setIsDragging(false);
      }}
      onDragCancel={() => setIsDragging(false)}
    >
      <Wrapper>
        <Wrapper style={{ width: 350, flexShrink: 0 }}>
          {parent === null ? item : null}
        </Wrapper>
        <GridContainer columns={2}>
          {containers.map((id) => (
            <Droppable key={id} id={id} dragging={isDragging}>
              {parent === id ? item : null}
            </Droppable>
          ))}
        </GridContainer>
      </Wrapper>
      <DraggableOverlay />
    </DndContext>
  );
};

interface DraggableProps {
  handle?: boolean;
}

const DraggableItem = ({ handle }: DraggableProps) => {
  const { isDragging, setNodeRef, listeners } = useDraggable({
    id: "draggable-item",
  });

  return (
    <Draggable
      dragging={isDragging}
      ref={setNodeRef}
      handle={handle}
      listeners={listeners}
      style={{
        opacity: isDragging ? 0 : undefined,
      }}
    />
  );
};

const BasicSetup = () => <DroppableStory />;

const MultipleDroppables = () => (
  <DroppableStory containers={["A", "B", "C"]} />
);

const CollisionDetectionAlgorithms = () => {
  const [{ algorithm }, setCollisionDetectionAlgorithm] = React.useState({
    algorithm: rectIntersection,
  });

  return (
    <>
      <DroppableStory
        collisionDetection={algorithm}
        containers={["A", "B", "C"]}
      />
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3>Collision detection algorithm</h3>
        <label>
          <input
            type="radio"
            value="rectIntersection"
            checked={algorithm === rectIntersection}
            onClick={() =>
              setCollisionDetectionAlgorithm({ algorithm: rectIntersection })
            }
          />
          Rect Intersection
        </label>
        <label>
          <input
            type="radio"
            value="closestCenter"
            checked={algorithm === closestCenter}
            onClick={() =>
              setCollisionDetectionAlgorithm({ algorithm: closestCenter })
            }
          />
          Closest Center
        </label>
        <label>
          <input
            type="radio"
            value="closestCorners"
            checked={algorithm === closestCorners}
            onClick={() =>
              setCollisionDetectionAlgorithm({ algorithm: closestCorners })
            }
          />
          Closest Corners
        </label>
        <label>
          <input
            type="radio"
            value="pointerWithin"
            checked={algorithm === pointerWithin}
            onClick={() =>
              setCollisionDetectionAlgorithm({ algorithm: pointerWithin })
            }
          />
          Pointer Within
        </label>
      </div>
    </>
  );
};

const FALLBACK_TAB = "Basic Setup";

const createTabNodeMap = () => {
  const map = new Map<string, React.ReactNode>();

  map.set(FALLBACK_TAB, <BasicSetup />);
  map.set("Multiple Droppables", <MultipleDroppables />);
  map.set("Collision Detection Algorithms", <CollisionDetectionAlgorithms />);

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
                pathname: `/${params.lang}/dropable/${key}`,
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
