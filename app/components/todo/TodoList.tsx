"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Task } from "./types";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { uuid } from "../../lib/uuid";
import { readTasks, writeTasks, debounceWrite } from "../../lib/todoStorage";

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load persisted tasks on the client after mount to avoid SSR/SSR hydration mismatch
  // Defer the setState to the next tick to avoid synchronous setState-in-effect warnings
  useEffect(() => {
    const id = window.setTimeout(() => {
      const loaded = readTasks();
      if (loaded.length) setTasks(loaded);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  // debounce writes to localStorage
  const persist = useMemo(() => debounceWrite((items: Task[]) => writeTasks(items)), []);

  useEffect(() => {
    persist(tasks);
  }, [tasks, persist]);

  function addTask(title: string) {
    const t: Task = {
      id: uuid(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      order: tasks.length,
    };
    setTasks((s) => [...s, t]);
  }

  function toggleTask(id: string) {
    setTasks((s) =>
      s.map((t) => (t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t))
    );
  }

  function deleteTask(id: string) {
    setTasks((s) => s.filter((t) => t.id !== id));
  }

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-4 text-2xl font-semibold">Todo</h2>
      <TodoForm onAdd={addTask} />
      <ul className="mt-4 space-y-2">
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
        ))}
      </ul>
    </div>
  );
}
