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

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      responses: categories 
    }
  });

  useEffect(() => {
    async function getData() {
      const result = await getMockTeammateFeedback();
      if (result.success) {
        setFeedbackData(result);
        reset({ responses: result.data.feedback });
      }
    }
    getData();
  }, [reset]);


  const onSubmit = async (data: FormValues) => {
    await submitTeammateFeedback({
      teammateId: 1,
      feedback: data.responses
    });
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TeammateSelector />
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
