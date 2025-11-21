'use client';

import { useEffect, useState } from 'react';
import { Task, UseTodosReturn } from '@/lib/types';

/**
 * Generate a UUID v4 identifier
 */
function generateUUID(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const STORAGE_KEY = 'todos';

/**
 * Custom hook for managing TODO tasks with localStorage persistence
 *
 * @returns {UseTodosReturn} Object containing tasks array and operation functions
 *
 * @example
 * const { tasks, addTask, toggleTask, deleteTask, isLoading } = useTodos();
 */
export function useTodos(): UseTodosReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setTasks(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks to localStorage:', error);
      }
    }
  }, [tasks, isLoading]);

  /**
   * Add a new task to the list
   * @param title The task title (will be trimmed)
   * @returns The created Task, or null if validation failed
   */
  const addTask = (title: string): Task | null => {
    const trimmedTitle = title.trim();

    // Validate: non-empty and within length bounds
    if (trimmedTitle.length === 0 || trimmedTitle.length > 500) {
      return null;
    }

    const newTask: Task = {
      id: generateUUID(),
      title: trimmedTitle,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    return newTask;
  };

  /**
   * Toggle the completion status of a task
   * @param taskId The ID of the task to toggle
   * @returns The updated Task, or null if not found
   */
  const toggleTask = (taskId: string): Task | null => {
    let updatedTask: Task | null = null;

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          updatedTask = { ...task, completed: !task.completed };
          return updatedTask;
        }
        return task;
      }),
    );

    return updatedTask;
  };

  /**
   * Delete a task from the list
   * @param taskId The ID of the task to delete
   * @returns true if task was found and deleted, false otherwise
   */
  const deleteTask = (taskId: string): boolean => {
    let wasDeleted = false;

    setTasks((prevTasks) => {
      const filtered = prevTasks.filter((task) => {
        if (task.id === taskId) {
          wasDeleted = true;
          return false;
        }
        return true;
      });
      return filtered;
    });

    return wasDeleted;
  };

  return {
    tasks,
    isLoading,
    addTask,
    toggleTask,
    deleteTask,
  };
}
