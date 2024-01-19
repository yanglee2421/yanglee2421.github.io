import { z } from "zod";

z.number();

const schema = z.object({
  // Primitive value
  bigint: z.bigint(),
  boolean: z.boolean(),
  number: z.number(),
  string: z.string(),
  symbol: z.symbol(),
  undefined: z.undefined(),
  null: z.null(),

  // Object
  array: z.array(z.string()).nonempty(),
  date: z.date(),
  map: z.map(z.string(), z.number()),
  promise: z.promise(z.object({})),
  set: z.set(z.number()),

  // TypeScript
  any: z.any(),
  unknown: z.unknown(),
  never: z.never(),
  void: z.void(), // accepts undefined
  tuple: z.tuple([z.number(), z.string()]),
  enum: z.enum(["one", "two"]),
});

export type Schema = z.infer<typeof schema>;
