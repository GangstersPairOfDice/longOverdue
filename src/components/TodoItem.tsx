import { useEffect, useState } from "react";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    timestamp: number;
    completed: boolean;
    completedTimestamp?: number;
  };
  deleteTodo: (todoId: number) => void;
  completeTodo: (todoId: number) => void;
}

export default function TodoItem({
  todo,
  deleteTodo,
  completeTodo,
}: TodoItemProps) {
  const [timeSinceAdded, setTimeSinceAdded] = useState("");
  const [timeSinceCompleted, setTimeSinceCompleted] = useState("");
  const [timeToComplete, setTimeToComplete] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = currentTime.getTime() - todo.timestamp;
      const secondsSinceAdded = Math.floor((timeDifference / 1000) % 60);
      const minutesSinceAdded = Math.floor((timeDifference / (1000 * 60)) % 60);
      const hoursSinceAdded = Math.floor(
        (timeDifference / (1000 * 60 * 60)) % 24
      );
      const daysSinceAdded = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      const newTimeSinceAdded = `Added ${daysSinceAdded}d ${hoursSinceAdded}h ${minutesSinceAdded}m ${secondsSinceAdded}s ago`;
      setTimeSinceAdded(newTimeSinceAdded);

      if (todo.completed && todo.completedTimestamp) {
        const completionTimeDifference =
          currentTime.getTime() - todo.completedTimestamp;
        const secondsSinceCompleted = Math.floor(
          (completionTimeDifference / 1000) % 60
        );
        const minutesSinceCompleted = Math.floor(
          (completionTimeDifference / (1000 * 60)) % 60
        );
        const hoursSinceCompleted = Math.floor(
          (completionTimeDifference / (1000 * 60 * 60)) % 24
        );
        const daysSinceCompleted = Math.floor(
          completionTimeDifference / (1000 * 60 * 60 * 24)
        );

        const newTimeSinceCompleted = `Completed ${daysSinceCompleted}d ${hoursSinceCompleted}h ${minutesSinceCompleted}m ${secondsSinceCompleted}s ago`;
        setTimeSinceCompleted(newTimeSinceCompleted);

        const timeToCompleteInMs = todo.completedTimestamp - todo.timestamp;
        const secondsToComplete = Math.floor((timeToCompleteInMs / 1000) % 60);
        const minutesToComplete = Math.floor(
          (timeToCompleteInMs / (1000 * 60)) % 60
        );
        const hoursToComplete = Math.floor(
          (timeToCompleteInMs / (1000 * 60 * 60)) % 24
        );
        const daysToComplete = Math.floor(
          timeToCompleteInMs / (1000 * 60 * 60 * 24)
        );

        const newTimeToComplete = `Took ${daysToComplete}d ${hoursToComplete}h ${minutesToComplete}m ${secondsToComplete}s`;
        setTimeToComplete(newTimeToComplete);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [todo.timestamp, todo.completed, todo.completedTimestamp]);

  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  return (
    <li className="flex justify-between items-center p-2 border border-transparent hover:border-gray-400 rounded">
      <div className="flex">
        <span className={todo.completed ? "line-through" : ""}>
          {todo.text}
        </span>
        <span className="ml-2 text-gray-500">
          {todo.completed
            ? `${timeSinceAdded} | ${timeSinceCompleted} | ${timeToComplete}`
            : timeSinceAdded}
        </span>
      </div>
      <div className="flex">
        {!todo.completed && (
          <button
            className="ml-10 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
            onClick={() => completeTodo(todo.id)}
          >
            Complete
          </button>
        )}
        <button
          className="ml-2 bg-red-500 hover:bg-red-600 text-black font-bold py-1 px-2 rounded"
          onClick={handleDeleteTodo}
        >
          Remove
        </button>
      </div>
    </li>
  );
}
