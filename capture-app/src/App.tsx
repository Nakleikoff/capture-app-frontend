import "./App.css"
import TeammateSelector from "./components/teammate-selector/teammate-selector"
import TabsCollection from "./components/tab-group/tab-group"
import TeamFeedback from "./TeamFeedback"
import { useEffect, useState } from "react"
import { getMockTeammateFeedback, type TeammateFeedbackResponse } from "./api/feedback"

function App() {
  const [feedbackData, setFeedbackData] = useState<TeammateFeedbackResponse | null>(null);

  useEffect(() => {
    async function getData() {
      const result = await getMockTeammateFeedback();
      if (result.success) {
        setFeedbackData(result);
      }

    }
    getData();
  }, [])

  const categories = feedbackData?.data.feedback || [];

  return (
    <>
      <TeammateSelector />
      <TabsCollection items={categories.map(category => {
        return {
          panelChildren: <TeamFeedback questions={category.questions} />,
          title: `${category.name}`
        }
      })} />
    </>
  )
}

export default App
