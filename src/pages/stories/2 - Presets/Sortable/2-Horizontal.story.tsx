import React from "react";
import { useParams, Link as RouterLink } from "react-router";
import { Grid as MuiGrid, Link } from "@mui/material";
import { MeasuringStrategy } from "@dnd-kit/core";
import {
  defaultAnimateLayoutChanges,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { Sortable } from "./Sortable";
import { List } from "../../components";
import { createRange } from "../../utilities";
import type { AnimateLayoutChanges } from "@dnd-kit/sortable";
import type { Props as SortableProps } from "./Sortable";

const itemCount = 50;
const baseStyles: React.CSSProperties = {
  height: 150,
  width: 150,
};

const props: Partial<SortableProps> = {
  // eslint-disable-next-line
  Container: (props: any) => <List horizontal {...props} />,
  itemCount,
  getItemStyles: () => baseStyles,
  strategy: horizontalListSortingStrategy,
};

const BasicSetup = () => <Sortable {...props} />;

const DragHandle = () => <Sortable {...props} handle />;

const LockedAxis = () => (
  <Sortable {...props} modifiers={[restrictToHorizontalAxis]} />
);

const ScrollContainer = () => (
  <div
    style={{
      width: "50vw",
      margin: "0 auto",
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

const VariableWidths = () => {
  const randomWidths = createRange(itemCount).map(() => {
    const widths = [110, undefined, 140, undefined, 90, undefined];
    const randomWidth = widths[Math.floor(random() * widths.length)];

    return randomWidth;
  });

  return (
    <Sortable
      {...props}
      wrapperStyle={({ id }) => {
        return {
          width: randomWidths[Number(id)],
        };
      }}
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

    return undefined;
  };

  return (
    <Sortable
      {...props}
      wrapperStyle={({ index }) => {
        return {
          ...baseStyles,
          marginRight: getMargin(index),
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

const FALLBACK_TAB = "Basic Setup";

const createTabNodeMap = () => {
  const map = new Map<string, React.ReactNode>();

  map.set(FALLBACK_TAB, <BasicSetup />);
  map.set("Drag Handle", <DragHandle />);
  map.set("Locked Axis", <LockedAxis />);
  map.set("Scroll Container", <ScrollContainer />);
  map.set("Press Delay", <PressDelay />);
  map.set("Minimum Distance", <MinimumDistance />);
  map.set("Variable Widths", <VariableWidths />);
  map.set("Margin Between Items", <MarginBetweenItems />);
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
                pathname: `/${params.lang}/sortable-horizontal/${key}`,
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
