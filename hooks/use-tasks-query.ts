import { useQuery } from "@tanstack/react-query";
import { tasksApi } from "@/lib/api/tasks";

export const TASKS_QUERY_KEY = ["tasks"] as const;

export function useTasksQuery() {
  return useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: tasksApi.getAll,
  });
}
