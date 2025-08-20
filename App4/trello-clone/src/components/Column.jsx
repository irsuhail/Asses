import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import Task from "./Task";

const Column = ({ id, title, tasks, onAddTask, onDeleteTask }) => {
  const [newTask, setNewTask] = useState("");

  return (
    <div className="column">
      <h2>{title}</h2>

      {id === "todo" && (
        <div className="add-task">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task"
          />
          <button
            onClick={() => {
              if (newTask.trim()) {
                onAddTask(newTask);
                setNewTask("");
              }
            }}
          >
            Add
          </button>
        </div>
      )}

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                columnId={id}
                onDeleteTask={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
