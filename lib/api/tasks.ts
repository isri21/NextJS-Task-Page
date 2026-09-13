import { apiFetch } from "@/lib/api/client";
import { AddTaskInput, Task, UpdateTaskInput } from "@/types/types";

export const tasksApi = {
  getAll: () => apiFetch<Task[]>("/task"),

  create: (input: AddTaskInput) =>
    apiFetch<Task>("/task", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  // Same request shape as create, targets the specific task.
  update: (id: string, input: UpdateTaskInput) =>
    apiFetch<Task>(`/task/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  delete: (id: string) =>
    apiFetch<null>(`/task/${id}`, {
      method: "DELETE",
    }),

  markComplete: (id: string) =>
    apiFetch<Task>(`/task/${id}/done`, {
      method: "PATCH",
    }),
};
