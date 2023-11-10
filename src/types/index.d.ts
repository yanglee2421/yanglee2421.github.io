export type Falsey = null | undefined | false | "" | 0 | 0n;
export type Truthy<T> = T extends Falsey ? never : T;
export interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}
