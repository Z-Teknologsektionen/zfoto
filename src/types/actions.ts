export type UseActionCallback = {
  onSuccess?: () => void;
  onExecute?: () => void;
  onSettled?: () => void;
  onError?: () => void;
};

export type UseActionCallbackProps = UseActionCallback | undefined;

export type UseActionCallbackWithOutErrorProps =
  | Omit<UseActionCallback, "onError">
  | undefined;
