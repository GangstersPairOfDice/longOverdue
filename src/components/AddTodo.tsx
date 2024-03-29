import React, { useState } from "react";

interface AddTodoProps {
  onAddTodo: (newTodoText: string) => void;
}

export default function AddTodo({ onAddTodo }: AddTodoProps) {
  const [text, setText] = useState("");

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.trim() !== "") {
      onAddTodo(text);
      setText("");
    }
  };

  return (
    <form className="flex items-center mb-4" onSubmit={handleAddTodo}>
      <input
        type="text"
        placeholder="Add a todo..."
        className="w-full rounded border p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
      >
        Add
      </button>
    </form>
  );
}
