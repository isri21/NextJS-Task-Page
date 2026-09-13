"use client";

import { Check, Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/types";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onComplete: (task: Task) => void;
}

export function TaskItem({ task, onEdit, onDelete, onComplete }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 hover:bg-neutral-50 transition-colors">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-neutral-900">{task.name}</span>
        <Badge variant={task.status === "Todo" ? "secondary" : "default"}>
          {task.status}
        </Badge>
      </div>

      <div className="flex gap-1.5">
        {task.status === "Todo" && (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            onClick={() => onComplete(task)}
            aria-label="Mark complete"
          >
            <Check className="h-4 w-4" />
          </Button>
        )}
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 bg-blue-100 text-blue-700 hover:bg-blue-200"
          onClick={() => onEdit(task)}
          aria-label="Edit task"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 bg-red-100 text-red-700 hover:bg-red-200"
          onClick={() => onDelete(task)}
          aria-label="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
