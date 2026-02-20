import React from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const Button = (props: Props) => {
  return (
    <button className={classNames(styles.Button)} {...props}>
      {props.children}
    </button>
  );
};
