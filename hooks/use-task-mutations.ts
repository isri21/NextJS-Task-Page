import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { tasksApi } from "@/lib/api/tasks";
import { getErrorMessage } from "@/lib/errors";
import { AddTaskInput, UpdateTaskInput } from "@/types/types";
import { TASKS_QUERY_KEY } from "@/hooks/use-tasks-query";

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: AddTaskInput) => tasksApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
      toast.success("Task created");
    },
    onError: (error) => {
      toast.error("Couldn't create task", { description: getErrorMessage(error) });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTaskInput }) =>
      tasksApi.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
      toast.success("Task updated");
    },
    onError: (error) => {
      toast.error("Couldn't update task", { description: getErrorMessage(error) });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tasksApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
      toast.success("Task deleted");
    },
    onError: (error) => {
      toast.error("Couldn't delete task", { description: getErrorMessage(error) });
    },
  });
}

export function useMarkTaskComplete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tasksApi.markComplete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
      toast.success("Task marked complete");
    },
    onError: (error) => {
      toast.error("Couldn't update task", { description: getErrorMessage(error) });
    },
  });
}
