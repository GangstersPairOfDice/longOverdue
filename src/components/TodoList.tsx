import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

interface Todo {
  id: number;
  text: string;
  timestamp: number;
}

const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (newTodoText: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: newTodoText,
      timestamp: Date.now(),
    };
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos, newTodo];
      saveTodosToLocalStorage(newTodos);
      return newTodos;
    });
  };

  const deleteTodo = (todoId: number) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todo) => todo.id !== todoId);
      saveTodosToLocalStorage(newTodos);
      return newTodos;
    });
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

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
