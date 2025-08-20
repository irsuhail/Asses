import React, { useState, useEffect } from "react";
import Column from "./Column";
import { DragDropContext } from "@hello-pangea/dnd";

const Board = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || {
      todo: [],
      inProgress: [],
      done: [],
    }
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (title) => {
    const newTask = { id: Date.now().toString(), title };
    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  };

  const handleDeleteTask = (columnId, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((task) => task.id !== taskId),
    }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) {
      return;
    }

    const sourceCol = [...tasks[source.droppableId]];
    const [removed] = sourceCol.splice(source.index, 1);

    const destCol = [...tasks[destination.droppableId]];
    destCol.splice(destination.index, 0, removed);

    setTasks((prev) => ({
      ...prev,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        <Column
          id="todo"
          title="To-Do"
          tasks={tasks.todo}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
        />
        <Column
          id="inProgress"
          title="In Progress"
          tasks={tasks.inProgress}
          onDeleteTask={handleDeleteTask}
        />
        <Column
          id="done"
          title="Done"
          tasks={tasks.done}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </DragDropContext>
  );
};

export default Board;
