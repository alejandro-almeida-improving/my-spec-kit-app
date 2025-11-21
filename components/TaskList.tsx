'use client';

import { Task } from '@/lib/types';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

/**
 * TaskList component that renders all tasks or empty state
 */
export function TaskList({
  tasks,
  isLoading,
  onToggleTask,
  onDeleteTask,
}: TaskListProps) {
  if (isLoading) {
    return <div className="text-center py-8 text-slate-500">Loading...</div>;
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}
