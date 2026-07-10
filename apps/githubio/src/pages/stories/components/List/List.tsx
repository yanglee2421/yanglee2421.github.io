import React from "react";
import classNames from "classnames";
import styles from "./List.module.css";

export interface Props {
  children: React.ReactNode;
  columns?: number;
  style?: React.CSSProperties;
  horizontal?: boolean;
  ref?: React.Ref<HTMLUListElement>;
}

export const List = ({
  children,
  columns = 1,
  horizontal,
  style,
  ref,
}: Props) => {
  return (
    <ul
      ref={ref}
      style={
        {
          ...style,
          "--columns": columns,
        } as React.CSSProperties
      }
      className={classNames(styles.List, horizontal && styles.horizontal)}
    >
      {children}
    </ul>
  );
};
