import FeedbackStars from "./components/FeedbackStars"

function App() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Feedback Rating</h1>
      <FeedbackStars numberOfStars={5} onRatingChange={(r) => console.log(r)} />
    </div>
  )
}

export default App
