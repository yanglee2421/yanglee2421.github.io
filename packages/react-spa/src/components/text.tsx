import React from "react";
import { useTranslation } from "react-i18next";

const TextContext = React.createContext("common");

type TextProviderProps = React.PropsWithChildren<{
  value: string;
}>;

export const TextProvider = (props: TextProviderProps) => {
  return <TextContext value={props.value}>{props.children}</TextContext>;
};

type TextProps = React.PropsWithChildren;

export const Text = (props: TextProps) => {
  const ns = React.use(TextContext);

  const [t] = useTranslation(ns);

  if (typeof props.children === "string") {
    return t(props.children);
  }

  return props.children;
};
