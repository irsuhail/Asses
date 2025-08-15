export function runProgram(input) {
  input = input.trim().split("\n");
  let t = Number(input[0]);
  let line = 1;

  for (let i = 0; i < t; i++) {
    let [a, b] = input[line++].trim().split(" ").map(Number);
    if (a > b) {
      console.log("NO");
    } else {
      console.log("YES");
    }
  }
}
