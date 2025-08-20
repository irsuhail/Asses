import React from "react";
import { Draggable } from "@hello-pangea/dnd";

const Task = ({ task, index, columnId, onDeleteTask }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <span>{task.title}</span>
          <button onClick={() => onDeleteTask(columnId, task.id)}>❌</button>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
