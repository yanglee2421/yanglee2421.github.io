import React from "react";
import { useParams, Link as RouterLink } from "react-router";
import { Grid as MuiGrid, Link } from "@mui/material";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { MultipleContainers, TRASH_ID } from "./MultipleContainers";
import { ConfirmModal } from "../../components";
import type { UniqueIdentifier, CancelDrop } from "@dnd-kit/core";

const BasicSetup = () => <MultipleContainers />;

const DragHandle = () => <MultipleContainers handle />;

const ManyItems = () => (
  <MultipleContainers
    containerStyle={{
      maxHeight: "80vh",
    }}
    itemCount={15}
    scrollable
  />
);

const Vertical = () => <MultipleContainers itemCount={5} vertical />;

const TrashableItems = ({ confirmDrop }: { confirmDrop: boolean }) => {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const resolveRef = React.useRef<(value: boolean) => void>(Boolean);

  const cancelDrop: CancelDrop = async ({ active, over }) => {
    if (over?.id !== TRASH_ID) {
      return false;
    }

    setActiveId(active.id);

    const confirmed = await new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });

    setActiveId(null);

    return confirmed === false;
  };

  return (
    <>
      <MultipleContainers
        cancelDrop={confirmDrop ? cancelDrop : undefined}
        trashable
      />
      {activeId && (
        <ConfirmModal
          onConfirm={() => resolveRef.current?.(true)}
          onDeny={() => resolveRef.current?.(false)}
        >
          Are you sure you want to delete "{activeId}"?
        </ConfirmModal>
      )}
    </>
  );
};

const Grid = () => (
  <MultipleContainers
    columns={2}
    strategy={rectSortingStrategy}
    wrapperStyle={() => ({
      width: 150,
      height: 150,
    })}
  />
);

const VerticalGrid = () => (
  <MultipleContainers
    columns={2}
    itemCount={5}
    strategy={rectSortingStrategy}
    wrapperStyle={() => ({
      width: 150,
      height: 150,
    })}
    vertical
  />
);

const FALLBACK_TAB = "Basic Setup";

const createTabNodeMap = () => {
  const map = new Map<string, React.ReactNode>();

  map.set(FALLBACK_TAB, <BasicSetup />);
  map.set("Drag Handle", <DragHandle />);
  map.set("Many Items", <ManyItems />);
  map.set("Vertical", <Vertical />);
  map.set("Trashable Items", <TrashableItems confirmDrop />);
  map.set("Grid", <Grid />);
  map.set("Vertical Grid", <VerticalGrid />);

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
                pathname: `/${params.lang}/sortable-multiple-containers/${key}`,
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
