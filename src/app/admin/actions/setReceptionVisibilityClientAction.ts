import { toast } from "react-hot-toast";
import { setReceptionVisibilityAction } from "./setReceptionVisibilityAction";

export const setReceptionVisibilityClientAction = async (visible: boolean) => {
  const loadingId = toast.loading(
    `${visible ? "Visar" : "Döljer"} alla mottagningsalbum...`,
  );
  const result = await setReceptionVisibilityAction({
    isVisible: visible,
  });

  toast.dismiss(loadingId);

  if (result.error) {
    return toast.error(result.error);
  }

  return toast.success(
    `${visible ? "Visar" : "Döljer"} nu alla mottagningsalbum!`,
  );
};
