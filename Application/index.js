const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tasks.json');
const args = process.argv.slice(2);
const command = args[0];

console.log("Welcome to Terminal Task Manager");

function getTasks() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

function showHelp() {
  console.log(`
🛠 Available Commands:
  add-task <title> <dueDate>         ➜ Add a new task
  list-tasks                         ➜ List all tasks
  complete-task <id|title>           ➜ Mark a task as completed
  update-task <id|title> <newTitle> <newDueDate> ➜ Update a task
  delete-task <id|title>             ➜ Delete a task
  search-tasks <keyword|YYYY-MM-DD>  ➜ Search tasks by title or due date
  help                               ➜ Show all commands
`);
}

if (command === 'add-task') {
  const title = args[1];
  const dueDate = args[2];

  if (!title || !dueDate) {
    console.log("Error: Task title and due date are required.");
    process.exit();
  }

  const tasks = getTasks();
  tasks.push({
    id: tasks.length + 1,
    title,
    dueDate,
    status: 'pending'
  });

  saveTasks(tasks);
  console.log(`Task "${title}" added successfully.`);

} else if (command === 'list-tasks') {
  const tasks = getTasks();
  if (tasks.length === 0) {
    console.log("No tasks found.");
  } else {
    tasks.forEach((task, i) => {
      console.log(`${i + 1}.  ${task.title} | Due: ${task.dueDate} | Status: ${task.status}`);
    });
  }

} else if (command === 'complete-task') {
  const input = args[1];
  const tasks = getTasks();
  let found = false;

  tasks.forEach(task => {
    if (task.id.toString() === input || task.title === input) {
      task.status = 'completed';
      found = true;
    }
  });

  if (found) {
    saveTasks(tasks);
    console.log("Task marked as completed.");
  } else {
    console.log("Task not found.");
  }

} else if (command === 'update-task') {
  const input = args[1];
  const newTitle = args[2];
  const newDueDate = args[3];

  if (!input || !newTitle || !newDueDate) {
    console.log("Error: update-task requires ID/Title, new Title, and new Due Date.");
    process.exit();
  }

  const tasks = getTasks();
  let updated = false;

  tasks.forEach(task => {
    if (task.id.toString() === input || task.title === input) {
      task.title = newTitle;
      task.dueDate = newDueDate;
      updated = true;
    }
  });

  if (updated) {
    saveTasks(tasks);
    console.log("Task updated successfully.");
  } else {
    console.log("Task not found.");
  }

} else if (command === 'delete-task') {
  const input = args[1];

  if (!input) {
    console.log("Error: delete-task requires an ID or Title.");
    process.exit();
  }

  let tasks = getTasks();
  const originalLength = tasks.length;

  tasks = tasks.filter(task => !(task.id.toString() === input || task.title === input));

  if (tasks.length === originalLength) {
    console.log("Task not found.");
  } else {
    saveTasks(tasks);
    console.log("Task deleted successfully.");
  }

} else if (command === 'search-tasks') {
  const keyword = args[1];

  if (!keyword) {
    console.log("Error: search-tasks requires a keyword or due date.");
    process.exit();
  }

  const tasks = getTasks();
  const results = tasks.filter(task =>
    task.title.includes(keyword) || task.dueDate === keyword
  );

  if (results.length === 0) {
    console.log(" No matching tasks found.");
  } else {
    results.forEach(task => {
      console.log(`🔹 ${task.title} | Due: ${task.dueDate} | Status: ${task.status}`);
    });
  }

} else if (command === 'help') {
  showHelp();

} else {
  console.log(" Unknown command. Type `help` to see available commands.");
}
