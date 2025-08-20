import React from "react";
import Board from "./components/Board";
import "./index.css";

function App() {
  return (
    <div className="app">
      <h1 className="header">Trello / Notion Clone</h1>
      <Board />
    </div>
  );
}

export default App;
