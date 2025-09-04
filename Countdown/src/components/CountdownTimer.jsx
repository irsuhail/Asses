import { useState, useRef, useEffect } from "react"
import "./CountdownTimer.css"
import alarmSound from "./alarm.mp3"

export default function CountdownTimer() {
  const [inputTime, setInputTime] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [initialTime, setInitialTime] = useState(0)

  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  const startTimer = () => {
    const seconds = parseInt(inputTime, 10)
    if (isNaN(seconds) || seconds <= 0) return
    setTimeLeft(seconds)
    setInitialTime(seconds)
    setIsRunning(true)
    setIsPaused(false)
  }

  const pauseResumeTimer = () => {
    setIsPaused((prev) => !prev)
  }

  const resetTimer = () => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setIsPaused(false)
    setTimeLeft(0)
    setInputTime("")
  }

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            setIsRunning(false)
            if (audioRef.current) {
              audioRef.current.play()
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning, isPaused])

  return (
    <div className="timer-container">
      <input
        type="number"
        placeholder="Enter seconds"
        value={inputTime}
        onChange={(e) => setInputTime(e.target.value)}
        disabled={isRunning}
      />

      <div className="buttons">
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        {isRunning && (
          <button onClick={pauseResumeTimer}>
            {isPaused ? "Resume" : "Pause"}
          </button>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>

      <h2>
        {timeLeft > 0 ? `Time Left: ${timeLeft}s` : "Time's up!"}
      </h2>

      {/* Progress Bar */}
      {initialTime > 0 && (
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(timeLeft / initialTime) * 100}%` }}
          ></div>
        </div>
      )}

      {/* Alarm sound */}
      <audio ref={audioRef} src={alarmSound} preload="auto"></audio>
    </div>
  )
}
