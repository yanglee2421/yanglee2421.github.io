import React from "react";
import { useParams, Link as RouterLink } from "react-router";
import { Link, Grid as MuiGrid } from "@mui/material";
import { MeasuringStrategy } from "@dnd-kit/core";
import {
  arraySwap,
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { Sortable } from "./Sortable";
import { GridContainer } from "../../components";
import type { AnimateLayoutChanges } from "@dnd-kit/sortable";
import type { Props as SortableProps } from "./Sortable";

const props: Partial<SortableProps> = {
  adjustScale: true,
  // eslint-disable-next-line
  Container: (props: any) => <GridContainer {...props} columns={5} />,
  strategy: rectSortingStrategy,
  wrapperStyle: () => ({
    width: 140,
    height: 140,
  }),
};

const BasicSetup = () => <Sortable {...props} />;

const WithoutDragOverlay = () => <Sortable {...props} useDragOverlay={false} />;

const LargeFirstTile = () => (
  <Sortable
    {...props}
    getItemStyles={({ index }) => {
      if (index === 0) {
        return {
          fontSize: "2rem",
          padding: "36px 40px",
        };
      }

      return {};
    }}
    wrapperStyle={({ index }) => {
      if (index === 0) {
        return {
          height: 288,
          gridRowStart: "span 2",
          gridColumnStart: "span 2",
        };
      }

      return {
        width: 140,
        height: 140,
      };
    }}
  />
);

const VariableSizes = () => (
  <Sortable
    {...props}
    itemCount={14}
    getItemStyles={({ index }) => {
      if (index === 0 || index === 9) {
        return {
          fontSize: "2rem",
          padding: "36px 40px",
        };
      }

      return {};
    }}
    wrapperStyle={({ index }) => {
      if (index === 0 || index === 9) {
        return {
          height: 288,
          gridRowStart: "span 2",
          gridColumnStart: "span 2",
        };
      }

      return {
        width: 140,
        height: 140,
      };
    }}
  />
);

const DragHandle = () => <Sortable {...props} handle />;

const ScrollContainer = () => (
  <div
    style={{
      height: "50vh",
      margin: "0 auto",
      overflow: "auto",
    }}
  >
    <Sortable {...props} />
  </div>
);

const Swappable = () => (
  <Sortable
    {...props}
    strategy={rectSwappingStrategy}
    reorderItems={arraySwap}
    getNewIndex={({ id, items, activeIndex, overIndex }) =>
      arraySwap(items, activeIndex, overIndex).indexOf(id)
    }
  />
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

const FALLBACK_TAB = "Basic Setup";

const createTabNodeMap = () => {
  const map = new Map<string, React.ReactNode>();

  map.set(FALLBACK_TAB, <BasicSetup />);
  map.set("Without Drag Overlay", <WithoutDragOverlay />);
  map.set("Large First Tile", <LargeFirstTile />);
  map.set("Variable Sizes", <VariableSizes />);
  map.set("Drag Handle", <DragHandle />);
  map.set("Scroll Container", <ScrollContainer />);
  map.set("Swappable", <Swappable />);
  map.set("Press Delay", <PressDelay />);
  map.set("Minimum Distance", <MinimumDistance />);
  map.set("Removable Items", <RemovableItems />);

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
                pathname: `/${params.lang}/sortable-grid/${key}`,
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
