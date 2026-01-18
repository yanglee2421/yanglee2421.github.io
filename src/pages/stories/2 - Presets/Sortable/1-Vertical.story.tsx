import {
  restrictToWindowEdges,
  restrictToVerticalAxis,
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";
import {
  defaultAnimateLayoutChanges,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { MeasuringStrategy } from "@dnd-kit/core";
import React from "react";
import { Link as RouterLink, useParams } from "react-router";
import { Link, Grid as MuiGrid } from "@mui/material";
import { Sortable } from "./Sortable";
import { createRange } from "../../utilities";
import type { AnimateLayoutChanges } from "@dnd-kit/sortable";
import type { UniqueIdentifier } from "@dnd-kit/core";
import type { Props as SortableProps } from "./Sortable";

const props: Partial<SortableProps> = {
  strategy: verticalListSortingStrategy,
  itemCount: 50,
};

const BasicSetup = () => <Sortable {...props} />;

const WithoutDragOverlay = () => <Sortable {...props} useDragOverlay={false} />;

const DragHandle = () => <Sortable {...props} handle />;

const LockedAxis = () => (
  <Sortable
    {...props}
    modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
  />
);

const RestrictToScrollContainer = () => (
  <div
    style={{
      height: "50vh",
      width: 350,
      margin: "200px auto 0",
      overflow: "auto",
    }}
  >
    <Sortable {...props} modifiers={[restrictToFirstScrollableAncestor]} />
  </div>
);

const ScrollContainer = () => (
  <div
    style={{
      height: "50vh",
      margin: "200px auto 0",
      overflow: "auto",
    }}
  >
    <Sortable {...props} />
  </div>
);

const PressDelay = () => (
  <Sortable
    {...props}
    activationConstraint={{
      delay: 250,
      tolerance: 5,
    }}
  />
);

const MinimumDistance = () => (
  <Sortable
    {...props}
    activationConstraint={{
      distance: 15,
    }}
  />
);

const random = () => Math.random();

const VariableHeights = () => {
  const randomHeights = createRange(props.itemCount as number).map(() => {
    const heights = [110, undefined, 140, undefined, 90, undefined];
    const randomHeight = heights[Math.floor(random() * heights.length)];

    return randomHeight;
  });

  return (
    <Sortable
      {...props}
      wrapperStyle={({ id }) => {
        return {
          height: randomHeights[Number(id)],
        };
      }}
    />
  );
};

const DisabledItems = () => {
  const disabledItems: UniqueIdentifier[] = [1, 5, 8, 13, 20];
  return (
    <Sortable
      {...props}
      isDisabled={(value) => disabledItems.includes(value)}
    />
  );
};

const MarginBetweenItems = () => {
  const getMargin = (index: number) => {
    if ([0, 6, 25, 45].includes(index)) {
      return 25;
    }

    if ([10, 15, 35].includes(index)) {
      return 80;
    }

    return 0;
  };

  return (
    <Sortable
      {...props}
      wrapperStyle={({ index }) => {
        return {
          marginBottom: getMargin(index),
        };
      }}
    />
  );
};

const RerenderBeforeSorting = () => {
  return (
    <Sortable
      {...props}
      wrapperStyle={({ active }) => {
        return {
          height: active ? 100 : 80,
        };
      }}
    />
  );
};

const RemovableItems = () => {
  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  return (
    <Sortable
      {...props}
      animateLayoutChanges={animateLayoutChanges}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      removable
      handle
    />
  );
};

const TransformedContainer = () => {
  return (
    <Sortable
      {...props}
      style={{ transform: "translate3d(100px, 100px, 0)" }}
    />
  );
};

const FALLBACK_TAB = "Basic Setup";

const createTabNodeMap = () => {
  const map = new Map<string, React.ReactNode>();

  map.set(FALLBACK_TAB, <BasicSetup />);
  map.set("Without Drag Overlay", <WithoutDragOverlay />);
  map.set("Drag Handle", <DragHandle />);
  map.set("Locked Axis", <LockedAxis />);
  map.set("Restrict To Scroll Container", <RestrictToScrollContainer />);
  map.set("Scroll Container", <ScrollContainer />);
  map.set("Press Delay", <PressDelay />);
  map.set("Minimum Distance", <MinimumDistance />);
  map.set("Variable Heights", <VariableHeights />);
  map.set("Disabled Items", <DisabledItems />);
  map.set("Margin Between Items", <MarginBetweenItems />);
  map.set("Rerender Before Sorting", <RerenderBeforeSorting />);
  map.set("Removable Items", <RemovableItems />);
  map.set("Transformed Container", <TransformedContainer />);

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
                pathname: `/${params.lang}/sortable-vertical/${key}`,
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
