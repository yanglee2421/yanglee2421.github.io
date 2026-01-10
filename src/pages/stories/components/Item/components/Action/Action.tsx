import React from "react";
import classNames from "classnames";
import styles from "./Action.module.css";

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: React.CSSProperties["cursor"];
  ref?: React.Ref<HTMLButtonElement>;
}

export const Action = ({
  ref,
  active,
  className,
  cursor,
  style,
  ...props
}: Props) => {
  return (
    <button
      ref={ref}
      {...props}
      className={classNames(styles.Action, className)}
      tabIndex={0}
      style={
        {
          ...style,
          cursor,
          "--fill": active?.fill,
          "--background": active?.background,
        } as React.CSSProperties
      }
    >
      {props.children}
    </button>
  );
};
