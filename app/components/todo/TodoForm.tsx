"use client";
import React, { useState } from "react";

type Props = {
  onAdd: (title: string) => void;
};

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Please enter a task title.");
      return;
    }
    onAdd(trimmed);
    setTitle("");
    setError("");
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task"
          aria-label="Task title"
        />
        <button className="rounded bg-sky-600 px-4 py-2 text-white" type="submit">
          Add
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
}
