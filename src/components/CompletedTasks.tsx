import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
  timestamp: number;
  completed: boolean;
  completedTimestamp?: number;
}

export default function CompletedTasks({
  completedTasks,
  deleteTodo,
}: {
  completedTasks: Todo[];
  deleteTodo: (todoId: number) => void;
}) {
  const [averageCompletionTime, setAverageCompletionTime] = useState("");

  useEffect(() => {
    if (completedTasks.length > 0) {
      const totalCompletionTime = completedTasks.reduce((total, task) => {
        const timeDifference = task.completedTimestamp
          ? task.completedTimestamp - task.timestamp
          : 0;
        return total + timeDifference;
      }, 0);
      const averageTime = totalCompletionTime / completedTasks.length;
      const averageTimeString = formatTime(averageTime);
      setAverageCompletionTime(averageTimeString);
    }
  }, [completedTasks]);

  const formatTime = (timeInMs: number) => {
    const secondsSinceAdded = Math.floor((timeInMs / 1000) % 60);
    const minutesSinceAdded = Math.floor((timeInMs / (1000 * 60)) % 60);
    const hoursSinceAdded = Math.floor((timeInMs / (1000 * 60 * 60)) % 24);
    const daysSinceAdded = Math.floor(timeInMs / (1000 * 60 * 60 * 24));

    return `${
      daysSinceAdded > 0 ? `${daysSinceAdded}d ` : ""
    }${hoursSinceAdded}h ${minutesSinceAdded}m ${secondsSinceAdded}s`;
  };

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
      <ul className="flex flex-col gap-2">
        {completedTasks.map((task) => (
          <TodoItem
            key={task.id}
            todo={task}
            deleteTodo={deleteTodo}
            completeTodo={() => {}} // No need to implement complete for completed tasks
          />
        ))}
      </ul>
      <p className="mt-4 text-gray-500">
        Average time to complete a task: {averageCompletionTime || "N/A"}
      </p>
    </div>
  );
}
