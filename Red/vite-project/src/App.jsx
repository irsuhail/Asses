import React, { useState } from "react";
import { runProgram } from "./runProgram";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleRun = () => {
    let logs = [];
    const originalLog = console.log;
    console.log = (msg) => logs.push(msg);
    runProgram(input);
    console.log = originalLog;
    setOutput(logs.join("\n"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Run Program in React (Vite)</h1>
      <textarea
        rows={6}
        cols={40}
        placeholder="Enter input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleRun}>Run</button>
      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
}
