import "./App.css";

import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <h1 className="underline flex items-center">
        <a
          href="https://github.com/GangstersPairOfDice/longOverdue"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
        >
          long0verdue
        </a>
        <span className="ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-white"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 007 0C6.47.65 5.79 1 5 1a5.07 5.07 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"></path>
          </svg>
        </span>
      </h1>
      <TodoList />
    </>
  );
}

export default App;
