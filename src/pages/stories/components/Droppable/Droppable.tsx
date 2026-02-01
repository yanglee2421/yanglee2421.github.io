import React from "react";
import classNames from "classnames";
import { useDroppable } from "@dnd-kit/core";
import styles from "./Droppable.module.css";
import { droppable } from "./droppable-svg";
import type { UniqueIdentifier } from "@dnd-kit/core";

interface Props {
  children: React.ReactNode;
  dragging: boolean;
  id: UniqueIdentifier;
}

export const Droppable = ({ children, id, dragging }: Props) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={classNames(
        styles.Droppable,
        isOver && styles.over,
        dragging && styles.dragging,
        Boolean(children) && styles.dropped,
      )}
      aria-label="Droppable region"
    >
      {children}
      {droppable}
    </div>
  );
};
