import { useState, useCallback } from "react";
import TreeNode from "./components/TreeNode";

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [count, setCount] = useState(0);

  const handleAdd = useCallback((parentId = null) => {
    const newNode = { id: Date.now() + Math.random(), value: "", children: [] };

    if (!parentId) {
      setNodes((prev) => [...prev, newNode]);
    } else {
      const addChild = (arr) =>
        arr.map((n) =>
          n.id === parentId ? { ...n, children: [...n.children, newNode] } : { ...n, children: addChild(n.children) }
        );
      setNodes((prev) => addChild(prev));
    }
    setCount((c) => c + 1);
  }, []);

  const handleChange = useCallback((id, newValue) => {
    const update = (arr) =>
      arr.map((n) =>
        n.id === id ? { ...n, value: newValue } : { ...n, children: update(n.children) }
      );
    setNodes((prev) => update(prev));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#4f46e5" }}>
        Nested Input Builder
      </h1>
      <button
        onClick={() => handleAdd(null)}
        style={{
          marginTop: "10px",
          marginBottom: "20px",
          background: "#10b981",
          color: "white",
          padding: "8px 12px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add Input
      </button>

      {nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          onChange={handleChange}
          onAdd={handleAdd}
        />
      ))}

      <div style={{ marginTop: "20px", fontWeight: "500" }}>
        Total Inputs: {count}
      </div>
    </div>
  );
}
