export type ActionReturnType<T extends {} | undefined = undefined> = Promise<
  | { success: false; error: string }
  | {
      success: true;
      data: T;
    }
>;

export type UseActionCallbackProps =
  | {
      onSuccess?: () => void;
    }
  | undefined;
