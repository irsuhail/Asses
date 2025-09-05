const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "notes.txt");

// Ensure file exists
function ensureFile() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "", "utf8");
  }
}

// Add a new note
function addNote(note) {
  ensureFile();
  fs.appendFileSync(filePath, note + "\n", "utf8");
  console.log(`✅ Note added: "${note}"`);
}

// List all notes
function listNotes() {
  ensureFile();
  const data = fs.readFileSync(filePath, "utf8").trim();
  if (!data) {
    console.log("📭 No notes found.");
    return;
  }
  const notes = data.split("\n");
  console.log("📝 Your Notes:");
  notes.forEach((note, index) => {
    console.log(`${index + 1}. ${note}`);
  });
}

// Delete a note by line number
function deleteNote(lineNumber) {
  ensureFile();
  const data = fs.readFileSync(filePath, "utf8").trim();
  if (!data) {
    console.log("📭 No notes to delete.");
    return;
  }
  const notes = data.split("\n");
  if (lineNumber < 1 || lineNumber > notes.length) {
    console.log("❌ Invalid note number.");
    return;
  }
  const removed = notes.splice(lineNumber - 1, 1);
  fs.writeFileSync(filePath, notes.join("\n") + (notes.length ? "\n" : ""), "utf8");
  console.log(`🗑️ Deleted note: "${removed[0]}"`);
}

// CLI handling
const command = process.argv[2];
const arg = process.argv[3];

switch (command) {
  case "add":
    if (!arg) {
      console.log("❌ Please provide a note to add.");
    } else {
      addNote(arg);
    }
    break;

  case "list":
    listNotes();
    break;

  case "delete":
    if (!arg || isNaN(arg)) {
      console.log("❌ Please provide a valid line number to delete.");
    } else {
      deleteNote(Number(arg));
    }
    break;

  default:
    console.log("📌 Usage:");
    console.log('  node app.js add "Your note here"');
    console.log("  node app.js list");
    console.log("  node app.js delete <lineNumber>");
    break;
}
