export type TaskStatus = "Todo" | "Completed";

export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
}

export interface AddTaskInput {
  name: string;
}

export type UpdateTaskInput = AddTaskInput;

export interface ApiErrorDetails {
  [field: string]: string[];
}

export interface ApiErrorShape {
  code: string;
  message: string;
  details?: ApiErrorDetails;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ApiErrorShape | null;
  meta: unknown | null;
}
