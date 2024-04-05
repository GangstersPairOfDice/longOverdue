import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import CompletedTasks from "./CompletedTasks";

interface Todo {
  id: number;
  text: string;
  timestamp: number;
  completed: boolean;
  completedTimestamp?: number;
}

const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Todo[]>([]);

  const addTodo = (newTodoText: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: newTodoText,
      timestamp: Date.now(),
      completed: false,
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

    setCompletedTasks((prevCompletedTasks) => {
      const newCompletedTasks = prevCompletedTasks.filter(
        (task) => task.id !== todoId
      );
      return newCompletedTasks;
    });
  };

  const completeTodo = (todoId: number) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, completed: true, completedTimestamp: Date.now() };
        }
        return todo;
      });
      saveTodosToLocalStorage(newTodos);

      const completedTask = newTodos.find((todo) => todo.id === todoId);
      if (completedTask) {
        setCompletedTasks((prevCompletedTasks) => [
          ...prevCompletedTasks,
          completedTask,
        ]);
      }

      return newTodos.filter((todo) => todo.id !== todoId);
    });
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const allTasks = JSON.parse(savedTodos);
      const activeTasks = allTasks.filter((task: Todo) => !task.completed);
      const completedTasks = allTasks.filter((task: Todo) => task.completed);
      setTodos(activeTasks);
      setCompletedTasks(completedTasks);
    }
  }, []);

  return (
    <div className="w-full h-full p-4">
      <AddTodo onAddTodo={addTodo} />
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
          />
        ))}
      </ul>
      <CompletedTasks completedTasks={completedTasks} deleteTodo={deleteTodo} />
    </div>
  );
}
