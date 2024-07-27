import { RefreshOutlined } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import localforage from "localforage";
import React from "react";
import { Translation } from "react-i18next";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { timeout } from "@/utils/timeout";

export function AsyncStore() {
  const value = useAsyncStore((store) => store.value);
  const setValue = useAsyncStore((store) => store.setValue);

  const isPending = React.useSyncExternalStore(
    (onStoreChange) => useAsyncStore.persist.onFinishHydration(onStoreChange),
    () => !useAsyncStore.persist.hasHydrated(),
  );

  return (
    <TextField
      disabled={isPending}
      value={value}
      onChange={(evt) => {
        setValue(evt.target.value);
      }}
      fullWidth
      label={
        <Translation ns="InputLabel">{(t) => t("async storage")}</Translation>
      }
      InputLabelProps={{ sx: { textTransform: "capitalize" } }}
      helperText={
        <Translation ns="FormHelperText">
          {(t) => t(isPending ? "pending..." : "finish hydration")}
        </Translation>
      }
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              disabled={isPending}
              onClick={() => {
                useAsyncStore.persist.rehydrate();
              }}
            >
              <RefreshOutlined />
            </IconButton>
          </InputAdornment>
        ),
      }}
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
