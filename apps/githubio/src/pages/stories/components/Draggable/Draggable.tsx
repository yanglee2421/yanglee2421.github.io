import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import classNames from "classnames";
import React from "react";
import { Handle } from "../Item";
import {
  draggable,
  draggableHorizontal,
  draggableVertical,
} from "./draggable-svg";
import styles from "./Draggable.module.css";

export const Axis = Object.freeze({
  All: "all",
  Vertical: "vertical",
  Horizontal: "horizontal",
});

interface Props {
  axis?: string;
  dragOverlay?: boolean;
  dragging?: boolean;
  handle?: boolean;
  label?: string;
  listeners?: DraggableSyntheticListeners;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  transform?: Transform | null;
  isPendingDelay?: boolean;
  children?: React.ReactNode;
  // eslint-disable-next-line
  ref?: React.Ref<any>;
}

export const Draggable = ({
  axis,
  dragOverlay,
  dragging,
  handle,
  label,
  listeners,
  transform,
  style,
  buttonStyle,
  isPendingDelay = false,
  ref,
  ...props
}: Props) => {
  return (
    <div
      className={classNames(
        styles.Draggable,
        dragOverlay && styles.dragOverlay,
        dragging && styles.dragging,
        handle && styles.handle,
        isPendingDelay && styles.pendingDelay,
      )}
      style={
        {
          ...style,
          "--translate-x": `${transform?.x ?? 0}px`,
          "--translate-y": `${transform?.y ?? 0}px`,
        } as React.CSSProperties
      }
    >
      <div
        {...props}
        aria-label="Draggable"
        data-cypress="draggable-item"
        {...(handle ? {} : listeners)}
        tabIndex={handle ? -1 : undefined}
        ref={ref}
        style={buttonStyle}
      >
        {axis === Axis.Vertical
          ? draggableVertical
          : axis === Axis.Horizontal
            ? draggableHorizontal
            : draggable}
        {handle ? <Handle {...(handle ? listeners : {})} /> : null}
        {props.children}
      </div>
      {label ? <label>{label}</label> : null}
    </div>
  );
};
