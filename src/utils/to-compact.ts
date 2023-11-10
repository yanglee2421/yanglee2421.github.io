// Types Imports
import { Falsey } from "@/types";

export function toCompact<TData>(list: Array<TData | Falsey>) {
  return list.filter(Boolean) as TData[];
}
