
const logScores = (name, ...scores) => {
  const total = scores.reduce((sum, score) => sum + score, 0);
  return `Player: ${name}, Scores: [${scores}], Total: ${total}`;
};


console.log(logScores("Riya", 120, 140, 100));


console.log(logScores("Dev"));


console.log(logScores("Mehul", 80, 90));
