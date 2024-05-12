export type ActionReturnType<T extends {} | undefined = undefined> = Promise<
  | { success: false; error: string }
  | {
      success: true;
      data: T;
    }
>;
