const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "students");

// Step 1: Create the "students" folder if it doesn't exist
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
  console.log("📁 'students' folder created.");
} else {
  console.log("📁 'students' folder already exists.");
}

// Step 2: Create 5 text files with student info
for (let i = 1; i <= 5; i++) {
  const filePath = path.join(folderPath, `student${i}.txt`);
  fs.writeFileSync(filePath, `This is student ${i}`, "utf8");
}
console.log("📝 5 student files created.");

// Step 3: Read all files inside the folder
const files = fs.readdirSync(folderPath);
console.log("\n📖 Reading student files:");
files.forEach((file) => {
  const content = fs.readFileSync(path.join(folderPath, file), "utf8");
  console.log(`${file}: ${content}`);
});

// Step 4: Delete all files inside the folder
files.forEach((file) => {
  fs.unlinkSync(path.join(folderPath, file));
});
console.log("\n🗑️ All student files deleted.");

// Step 5: Delete the "students" folder
fs.rmdirSync(folderPath);
console.log("🗑️ 'students' folder deleted.");
