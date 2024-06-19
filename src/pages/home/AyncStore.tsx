import { TextField } from "@mui/material";
import localforage from "localforage";
import React from "react";
import { Translation } from "react-i18next";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { timeout } from "@/utils/timeout";

export function AsyncStore() {
  const value = useAsyncStore((store) => store.value);
  const setValue = useAsyncStore((store) => store.setValue);

  return (
    <TextField
      value={value}
      onChange={(evt) => {
        setValue(evt.target.value);
      }}
      fullWidth
      label={
        <Translation ns="InputLabel">{(t) => t("async storage")}</Translation>
      }
      InputLabelProps={{ sx: { textTransform: "capitalize" } }}
    />
  );
}

const useAsyncStore = create(
  persist<AsyncStore>(
    (set, get) => {
      return {
        value: "",
        setValue(updater) {
          set({
            value:
              typeof updater === "function" ? updater(get().value) : updater,
          });
        },
      };
    },
    {
      name: "useAsyncStore",
      storage: createJSONStorage(() => {
        return {
          async getItem(name) {
            await timeout(1000 * 2);
            return localforage.getItem(name);
          },
          async setItem(name, value) {
            await timeout(1000 * 2);
            return localforage.setItem(name, value);
          },
          async removeItem(name) {
            await timeout(1000 * 2);
            return localforage.removeItem(name);
          },
        };
      }),
    },
  ),
);

type AsyncStore = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};
