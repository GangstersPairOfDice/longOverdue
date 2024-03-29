import { useEffect, useState } from "react";

interface TimeTrackerProps {
  lastAddedTodoTimestamp: number;
}

export default function TimeTracker({
  lastAddedTodoTimestamp,
}: TimeTrackerProps) {
  const [timeSinceAdded, setTimeSinceAdded] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = currentTime.getTime() - lastAddedTodoTimestamp;
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
  }, [lastAddedTodoTimestamp]);

  return (
    <div className="mb-4">
      <h2>Time Tracking</h2>
      <p>It's been {timeSinceAdded} since the last task was added.</p>
    </div>
  );
}
