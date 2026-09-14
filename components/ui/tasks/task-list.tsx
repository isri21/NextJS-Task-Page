import { Task } from "@/types/types";
import { TaskItem } from "./task-item";
import { Skeleton } from "@/components/ui/skeleton";

interface TaskListProps {
  tasks: Task[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onComplete: (task: Task) => void;
}

export function TaskList({
  tasks,
  isLoading,
  isError,
  onEdit,
  onDelete,
  onComplete,
}: TaskListProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((_, i) => (
          <Skeleton key={i} className="h-[52px] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-md bg-red-50 p-4 text-center">
        <p className="text-sm text-red-700">
          Couldn&apos;t reach the server, at this moment! Please try again later.
        </p>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <p className="flex items-center justify-center rounded-md bg-neutral-100 p-4 text-sm text-neutral-600">
        You have no tasks yet.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}
