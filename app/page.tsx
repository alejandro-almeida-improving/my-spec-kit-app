'use client';

import { useTodos } from '@/lib/hooks/useTodos';
import { TaskInput } from '@/components/TaskInput';
import { TaskList } from '@/components/TaskList';

export default function Home() {
  const { tasks, isLoading, addTask, toggleTask, deleteTask } = useTodos();

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-2xl mx-auto py-12 px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            My TODO List
          </h1>
          <p className="text-slate-600">
            Stay organized and never forget a task
          </p>
        </header>

        <TaskInput onAddTask={addTask} isDisabled={isLoading} />
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
