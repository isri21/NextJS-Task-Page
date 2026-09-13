import { Task } from "@/types/types";
import { TaskItem } from "./task-item";
import { Skeleton } from "@/components/ui/skeleton";

interface TaskListProps {
  tasks: Task[] | undefined;
  isLoading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onComplete: (task: Task) => void;
}

export function TaskList({
  tasks,
  isLoading,
  onEdit,
  onDelete,
  onComplete,
}: TaskListProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[52px] w-full rounded-lg" />
        ))}
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
