import { useEffect, useState } from "react";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    timestamp: number;
  };
  deleteTodo: () => void;
}

export default function TodoItem({ todo, deleteTodo }: TodoItemProps) {
  const [timeSinceAdded, setTimeSinceAdded] = useState("");

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

      const newTimeSinceAdded = `${daysSinceAdded}d ${hoursSinceAdded}h ${minutesSinceAdded}m ${secondsSinceAdded}s`;
      setTimeSinceAdded(newTimeSinceAdded);
    }, 1000);

    return () => clearInterval(timer);
  }, [todo.timestamp]);

  return (
    <li className="flex justify-between items-center border border-transparent hover:border-gray-400 rounded">
      <div className="flex items-center">
        <span>{todo.text}</span>
        <span className="ml-2 text-gray-500">{timeSinceAdded} ago</span>
      </div>
      <button
        className="ml-10 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
        onClick={deleteTodo}
      >
        Remove
      </button>
    </li>
  );
}
