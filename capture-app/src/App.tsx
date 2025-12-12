import "./App.css"
import TeammateSelector from "./components/teammate-selector/teammate-selector"
import TabsCollection from "./components/tab-group/tab-group"
import TeamFeedback from "./TeamFeedback"
import { useEffect, useState } from "react"
import { getMockTeammateFeedback, submitTeammateFeedback, type FeedbackCategory, type TeammateFeedbackResponse } from "./api/feedback"
import { useForm } from "react-hook-form"

type FormValues = {
  responses: FeedbackCategory[];
};

function App() {
  const [feedbackData, setFeedbackData] = useState<TeammateFeedbackResponse | null>(null);
  const categories = feedbackData?.data.feedback || [];
  const [teammateId, setTeammateId] = useState<number>(1);

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      responses: categories 
    }
  });

  useEffect(() => {
    async function getData() {
      const result = await getMockTeammateFeedback(teammateId);
      if (result.success) {
        setFeedbackData(result);
        reset({ responses: result.data.feedback });
      }
    }
    getData();
  }, [reset, teammateId]);


  const onSubmit = async (data: FormValues) => {
    await submitTeammateFeedback({
      teammateId: teammateId,
      feedback: data.responses
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TeammateSelector setTeammateId={setTeammateId} />
      <TabsCollection items={categories.map((category, catIdx) => {
        return {
          panelChildren: <TeamFeedback
            category={category}
            control={control}
            catIdx={catIdx}
          />,
          title: `${category.categoryName}`
        }
      })} />
      <button type="submit">Save All</button>
    </form>
  )
}

export default App
