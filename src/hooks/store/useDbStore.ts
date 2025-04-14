import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import React from "react";
import localforage from "localforage";
import type { WritableDraft } from "immer";

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type ChatStatus = "pending" | "success" | "error" | "loading";

export type ChatLog = {
  id: string;
  question: string;
  questionDate: string;
  messages: Message[];
  answer: string;
  answerDate: null | string;
  status: ChatStatus;
  thumb: "up" | "down" | null;
};

export type Invoice = {
  id: string;
  amount: number;
  staff: string[];
  note: string;
  date: number;
};

export type Staff = {
  id: string;
  name: string;
  alias: string;
  enable: boolean;
};

type State = {
  invoices: Array<Invoice>;
  staffs: Staff[];
  chatLog: [string, ChatLog][];
};

type Actions = {
  set(
    nextStateOrUpdater:
      | State
      | Partial<State>
      | ((state: WritableDraft<State>) => void),
  ): void;
};

type Store = State & Actions;

export const useDbStore = create<Store>()(
  persist(
    immer((set) => ({
      set,
      invoices: [],
      staffs: [],
      chatLog: [],
    })),
    {
      name: "useDbStore",
      storage: createJSONStorage(() => localforage),
      version: 2,
    },
  ),
);

export const useDbStoreHasHydrated = () =>
  React.useSyncExternalStore(
    (onStateChange) => useDbStore.persist.onFinishHydration(onStateChange),
    () => useDbStore.persist.hasHydrated(),
    () => false,
  );
