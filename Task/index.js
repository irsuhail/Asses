const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tasks.json');
const args = process.argv.slice(2);
const command = args[0];

console.log(" Welcome to Terminal Task Manager");

function getTasks() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

if (command === 'add-task') {
  const title = args[1];
  const dueDate = args[2];

  if (!title || !dueDate) {
    console.log(" Error: Task title and due date are required.");
    process.exit();
  }

  const tasks = getTasks();
  tasks.push({
    id: tasks.length + 1,
    title: title,
    dueDate: dueDate,
    status: 'pending'
  });

  saveTasks(tasks);
  console.log(` Task "${title}" added successfully.`);

} else if (command === 'list-tasks') {
  const tasks = getTasks();
  if (tasks.length === 0) {
    console.log(" No tasks found.");
  } else {
    tasks.forEach((task, index) => {
      console.log(
        `${index + 1}.  ${task.title} | Due: ${task.dueDate} | Status: ${task.status}`
      );
    });
  }

} else if (command === 'complete-task') {
  const input = args[1];

  if (!input) {
    console.log(" Please provide task ID or title.");
    process.exit();
  }

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
    console.log(" Task marked as completed.");
  } else {
    console.log(" Task not found.");
  }

} else {
  console.log(`
🛠  Available commands:
  - node index.js add-task "Title" "YYYY-MM-DD"
  - node index.js list-tasks
  - node index.js complete-task <ID or Title>
  `);
}
