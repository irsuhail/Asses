import { memo } from "react";

function TreeNode({ node, onChange, onAdd }) {
  return (
    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
      <input
        type="text"
        value={node.value}
        onChange={(e) => onChange(node.id, e.target.value)}
        style={{ padding: "6px", border: "1px solid #ccc", borderRadius: "6px" }}
        placeholder="Enter text"
      />
      <button
        onClick={() => onAdd(node.id)}
        style={{
          marginLeft: "8px",
          background: "#4f46e5",
          color: "white",
          padding: "6px 10px",
          borderRadius: "6px",
          cursor: "pointer",
          border: "none"
        }}
      >
        Add Sub Input
      </button>

      {node.children.map((child) => (
        <TreeNode
          key={child.id}
          node={child}
          onChange={onChange}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}

export default memo(TreeNode);
