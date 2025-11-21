'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TaskInputProps {
  onAddTask: (title: string) => void;
  isDisabled?: boolean;
}

/**
 * TaskInput component for entering and submitting new tasks
 * Handles form submission via button click or Enter key
 */
export function TaskInput({ onAddTask, isDisabled = false }: TaskInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddTask(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isDisabled}
        data-testid="task-input"
        className="flex-1"
      />
      <Button type="submit" disabled={isDisabled} data-testid="add-button">
        Add Task
      </Button>
    </form>
  );
}
