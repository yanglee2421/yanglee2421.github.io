import Dexie, { type EntityTable } from "dexie";

export type Completion = {
  id: number;
  name: string;
};

export type MessageInAPI = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type MessageStatus = "pending" | "success" | "error" | "loading";

export type Message = {
  id: number;
  completionId: number; // Foreign key to the Completion table
  question: string;
  questionDate: string;
  messages: MessageInAPI[];
  answer: string;
  answerDate: null | string;
  status: MessageStatus;
  thumb: "up" | "down" | null;
};

export type Invoice = {
  id: number;
  amount: number;
  staff: string[];
  note: string;
  date: number;
};

export type Staff = {
  id: number;
  name: string;
  alias: string;
  enable: boolean;
};

export const db = new Dexie("ChatDatabase") as Dexie & {
  completions: EntityTable<
    Completion,
    "id" // primary key "id" (for the typings only)
  >;
  messages: EntityTable<
    Message,
    "id" // primary key "id" (for the typings only)
  >;
  invoices: EntityTable<
    Invoice,
    "id" // primary key "id" (for the typings only)
  >;
  staffs: EntityTable<
    Staff,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(2).stores({
  completions: "++id, name", // primary key "id" automatically generated
  messages:
    "++id, completionId, question, questionDate, answer, answerDate, status, thumb",
  invoices: "++id, amount, staff, note, date",
  staffs: "++id, name, &alias, enable", // field "alias" is unique
});
