"use client";

import { useState } from "react";

import { Task } from "@/types/types";
import { useTasksQuery } from "@/hooks/use-tasks-query";
import { useDeleteTask, useMarkTaskComplete } from "@/hooks/use-task-mutations";
import { TaskForm } from "./task-form";
import { TaskList } from "./task-list";
import { TaskEditDialog } from "./task-edit-dialog";
import { ConfirmDialog } from "./confirm-dialog";

export function TaskBoard() {
  const { data: tasks, isLoading, isError } = useTasksQuery();

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
  const { mutate: markComplete } = useMarkTaskComplete();

  const handleConfirmDelete = () => {
    if (!deletingTask) return;
    deleteTask(deletingTask.id, {
      onSuccess: () => setDeletingTask(null),
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h1 className="text-lg font-semibold tracking-tight text-neutral-900 mb-6">
        Task List
      </h1>

      <TaskForm />

      <TaskList
        tasks={tasks}
        isLoading={isLoading}
        isError={isError}
        onEdit={setEditingTask}
        onDelete={setDeletingTask}
        onComplete={(task) => markComplete(task.id)}
      />

      <TaskEditDialog
        task={editingTask}
        open={!!editingTask}
        onOpenChange={(open) => !open && setEditingTask(null)}
      />

      <ConfirmDialog
        open={!!deletingTask}
        onOpenChange={(open) => !open && setDeletingTask(null)}
        title="Delete this task?"
        description={`"${deletingTask?.name ?? ""}" will be permanently removed. This can't be undone.`}
        confirmLabel="Delete"
        destructive
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
