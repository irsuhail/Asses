import React, { useState } from "react";
import Modal from "./components/Modal";
import "./index.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Reusable Modal Demo</h1>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Hello from the Modal 🎉</h2>
        <p>This modal is reusable. You can pass any content here.</p>
        <button onClick={() => setIsOpen(false)}>Close from Inside</button>
      </Modal>
    </div>
  );
}

export default App;
