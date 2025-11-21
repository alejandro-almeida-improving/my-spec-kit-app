import { Task } from "../components/todo/types";

const STORAGE_KEY = "todo:tasks";

function nowISO(): string {
  return new Date().toISOString();
}

export function readTasks(): Task[] {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Partial<Task>[];
    // normalize and ensure required fields
    return parsed.map((p, i) => ({
      id: p.id || `todo-${i}`,
      title: (p.title || "").toString(),
      completed: Boolean(p.completed),
      createdAt: p.createdAt || nowISO(),
      updatedAt: p.updatedAt || (p.createdAt || nowISO()),
      order: typeof p.order === "number" ? p.order : i,
    }));
  } catch (e) {
    console.error("Failed to read tasks from localStorage", e);
    return [];
  }
}

export function writeTasks(tasks: Task[]) {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to write tasks to localStorage", e);
  }
}

// Simple debounce to avoid too-frequent writes if desired by caller
export function debounceWrite<T extends unknown[]>(fn: (...args: T) => void, wait = 150) {
  let t: number | undefined;
  return (...args: T) => {
    if (t) clearTimeout(t);
    t = window.setTimeout(() => fn(...args), wait) as unknown as number;
  };
}
