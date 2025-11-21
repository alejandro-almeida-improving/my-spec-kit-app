'use client';

import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

/**
 * TaskItem component for rendering individual tasks
 * Includes checkbox for toggling completion and delete button
 */
export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        data-testid={`checkbox-${task.id}`}
      />
      <span
        className={
          task.completed
            ? 'line-through opacity-50 text-slate-500 flex-1'
            : 'text-slate-900 flex-1'
        }
        data-testid={`task-title-${task.id}`}
      >
        {task.title}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(task.id)}
        data-testid={`delete-button-${task.id}`}
        className="text-red-600 hover:text-red-800 hover:bg-red-50"
        aria-label={`Delete "${task.title}"`}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
