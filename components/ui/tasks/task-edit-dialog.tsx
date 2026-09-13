"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "./confirm-dialog";
import { Task, UpdateTaskInput } from "@/types/types";
import { useUpdateTask } from "@/hooks/use-task-mutations";

interface TaskEditDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskEditDialog({ task, open, onOpenChange }: TaskEditDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateTaskInput>();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingInput, setPendingInput] = useState<UpdateTaskInput | null>(null);
  const { mutate, isPending } = useUpdateTask();

  // Repopulate the form whenever a new task is opened for editing.
  useEffect(() => {
    if (task) reset({ name: task.name });
  }, [task, reset]);

  const onSubmit = (input: UpdateTaskInput) => {
    setPendingInput(input);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (!task || !pendingInput) return;
    mutate(
      { id: task.id, input: pendingInput },
      {
        onSuccess: () => {
          setConfirmOpen(false);
          onOpenChange(false);
        },
        onSettled: () => {
          // Keep the confirm dialog open on error so the user sees the toast
          // and can retry without losing their input.
        },
      }
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-task-name">Task name</Label>
              <Input
                id="edit-task-name"
                aria-label="edit-task-name"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 5, message: "Must be at least 5 characters" },
                })}
              />
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Save changes?"
        description="This will update the task's name."
        confirmLabel="Save"
        isLoading={isPending}
        onConfirm={handleConfirm}
      />
    </>
  );
}
