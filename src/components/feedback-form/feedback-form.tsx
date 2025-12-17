import TabGroup from "../../components/tab-group/tab-group"
import TeamFeedback from "../team-feedback/TeamFeedback"
import { useEffect, useState } from "react"
import {
  getMockTeammateFeedback,
  submitTeammateFeedback,
  type FeedbackCategory,
  type TeammateFeedbackResponse,
} from "../../api/feedback"
import { useForm } from "react-hook-form"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

export type FormValues = {
  responses: FeedbackCategory[]
}

export default function FeedbackForm({ teammateId }: { teammateId: number }) {
  const [feedbackData, setFeedbackData] =
    useState<TeammateFeedbackResponse | null>(null)

  const categories = feedbackData?.data.feedback || []
  const [loading, setLoading] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState("")

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      responses: categories,
    },
  })

  useEffect(() => {
    async function getData() {
      const result = await getMockTeammateFeedback(teammateId)
      if (result.success) {
        setFeedbackData(result)
        reset({ responses: result.data.feedback })
      }
    }
    getData()
  }, [reset, teammateId])

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    try {
      await submitTeammateFeedback({
        teammateId: teammateId,
        feedback: data.responses,
      })
      setToastMsg("Feedback submitted!")
      setToastOpen(true)
    } catch {
      setToastMsg("Submission failed.")
      setToastOpen(true)
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TabGroup
        items={categories.map((category, catIdx) => ({
          panelChildren: (
            <TeamFeedback
              category={category}
              control={control}
              catIdx={catIdx}
            />
          ),
          title: category.categoryName,
        }))}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </form>
  )
}
