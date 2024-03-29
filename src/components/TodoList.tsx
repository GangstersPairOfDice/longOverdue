import { useState } from "react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

interface Todo {
  id: number;
  text: string;
  timestamp: number;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (newTodoText: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: newTodoText,
      timestamp: Date.now(),
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  return (
    <div className="w-full h-full p-4">
      <AddTodo onAddTodo={addTodo} />
      <ul className="flex flex-col gap-2">
        {/* Map over todos array and render TodoItem component for each todo */}
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
}
