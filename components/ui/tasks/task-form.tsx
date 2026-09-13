"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddTaskInput } from "@/types/types";
import { useCreateTask } from "@/hooks/use-task-mutations";

export function TaskForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTaskInput>();
  const { mutate, isPending } = useCreateTask();

  const onSubmit = (data: AddTaskInput) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
      <div className="flex gap-2">
        <Input
          {...register("name", {
            required: "Name is required",
            minLength: { value: 5, message: "Must be at least 5 characters" },
          })}
          aria-label="input-task"
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding…" : "Add"}
        </Button>
      </div>
      {errors.name && (
        <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
      )}
    </form>
  );
}
