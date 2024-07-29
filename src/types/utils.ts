export type Prettify<T> = NonNullable<unknown> & {
  [K in keyof T]: T[K];
};

export type MaybePromise<T> = Promise<T> | T;
