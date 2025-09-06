import { useState } from "react";
import { distance } from "fastest-levenshtein";
import words from "../words";

export default function AutoCorrectInput() {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  
  function handleChange(e) {
    let value = e.target.value;
    setText(value);

    let lastWord = value.split(/\s+/).pop().toLowerCase();

    if (lastWord.length > 0) {
      let matches = words.filter(w => w.startsWith(lastWord)).slice(0, 5);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }

  
  function handleKeyDown(e) {
    if (e.key === " ") {
      let parts = text.trim().split(/\s+/);
      let lastWord = parts.pop();

      if (lastWord && !words.includes(lastWord)) {
        let corrected = findClosestWord(lastWord);
        parts.push(corrected);
        setText(parts.join(" ") + " ");
      }
    }
  }

  
  function findClosestWord(word) {
    let closest = words[0];
    let minDist = distance(word, closest);

    for (let w of words) {
      let d = distance(word, w);
      if (d < minDist) {
        minDist = d;
        closest = w;
      }
    }
    return closest;
  }

 
  function checkSpelling() {
    let corrected = text
      .split(/\s+/)
      .map(w => (w && !words.includes(w) ? findClosestWord(w) : w))
      .join(" ");
    setText(corrected);
  }

  
  function resetText() {
    setText("");
    setSuggestions([]);
  }

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <textarea
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows="5"
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        placeholder="Type here..."
      />

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div style={{ border: "1px solid #ccc", padding: "5px", marginTop: "5px" }}>
          {suggestions.map((s, i) => (
            <div key={i} style={{ padding: "2px 5px", cursor: "pointer" }}>
              {s}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: "10px" }}>
        <button onClick={checkSpelling} style={{ marginRight: "10px" }}>
          Check Spelling
        </button>
        <button onClick={resetText}>Reset</button>
      </div>
    </div>
  );
}
