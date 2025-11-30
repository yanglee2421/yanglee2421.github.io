import React from "react";
import type { HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: Props) {
  return <button {...props}>{children}</button>;
}
