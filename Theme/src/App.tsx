import { useTheme } from "./hooks/useTheme"

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="app">
      <h1>Custom React Hook: Light/Dark Theme</h1>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  )
}

export default App
