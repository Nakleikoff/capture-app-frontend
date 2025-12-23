import "./App.css"
import TeammateSelector from "./components/TeammateSelector/TeammateSelector"
import FeedbackForm from "./components/FeedbackForm/FeedbackForm"
import { useState } from "react"

function App() {
  const [teammateId, setTeammateId] = useState<number>(0)

  return (
    <>
      <TeammateSelector setTeammateId={setTeammateId} />
      <FeedbackForm teammateId={teammateId} />
    </>
  )
}

export default App
