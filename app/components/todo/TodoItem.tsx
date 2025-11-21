"use client";
import React from "react";
import { Task } from "./types";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ task, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center justify-between gap-4 rounded border px-3 py-2">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} as completed`}
        />
        <span className={task.completed ? "line-through text-zinc-500" : ""}>{task.title}</span>
      </div>
      <div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-sm text-red-600 hover:underline"
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
