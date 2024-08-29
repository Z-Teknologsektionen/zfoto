import type { FC, ReactNode } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type DeleteDialogProps = {
  onDelete: () => void;
  isDisabled?: boolean;
  title: string;
  description: string;
  cancelNode?: ReactNode;
  children?: ReactNode;
  deleteNode?: ReactNode;
};

export const DeleteDialog: FC<DeleteDialogProps> = ({
  onDelete,
  cancelNode = "Avbryt",
  deleteNode = "Radera",
  description,
  isDisabled,
  children,
  title,
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button disabled={isDisabled} type="button" variant="destructive">
        Radera
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {children}
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            {cancelNode}
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              onDelete();
            }}
          >
            {deleteNode}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
