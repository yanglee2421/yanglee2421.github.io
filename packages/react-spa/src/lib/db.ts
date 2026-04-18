import type { EntityTable } from "dexie";
import Dexie from "dexie";

export interface Completion {
  id: number;
  name: string;
}

export interface MessageInAPI {
  role: "user" | "assistant" | "system";
  content: string;
}

export type MessageStatus = "pending" | "success" | "error" | "loading";

export interface Message {
  id: number;
  // Foreign key to the Completion table
  completionId: number;
  question: string;
  questionDate: string;
  messages: MessageInAPI[];
  answer: string;
  answerDate: null | string;
  status: MessageStatus;
  thumb: "up" | "down" | null;
}

export interface Invoice {
  id: number;
  amount: number;
  staff: string[];
  note: string;
  // ISO 8601 date format
  // e.g., "2023-10-01T12:00:00Z" or "2023-10-01"
  date: string;
}

export interface Staff {
  id: number;
  name: string;
  alias: string;
  enable: boolean;
}

export const db = new Dexie("ChatDatabase") as Dexie & {
  completions: EntityTable<Completion, "id">;
  messages: EntityTable<Message, "id">;
  invoices: EntityTable<Invoice, "id">;
  staffs: EntityTable<Staff, "id">;
};

// Schema declaration:
db.version(3).stores({
  // primary key "id" automatically generated
  completions: "++id, name",
  messages:
    "++id, completionId, question, questionDate, answer, answerDate, status, thumb",
  invoices: "++id, amount, staff, note, date",

  // field "alias" is unique
  staffs: "++id, name, &alias, enable",
});
