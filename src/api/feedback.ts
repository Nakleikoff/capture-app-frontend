import { getData, postData, type ApiResponse } from "./api-service"

export type Answer = {
  value: "yes" | "no" | "not_sure" | null
  comment: string | undefined
}

export type Question = { id: number; text: string; answer?: Answer }

export type Category = {
   id: number
  name: string
}
export type FeedbackCategory = {
  category: Category
  questions: Question[]
}

export type TeammateFeedback = {
  teammate: { id: number; name: string }
  feedback: FeedbackCategory[]
}

export type TeammateFeedbackRequest = {
  teammateId: number
  feedback: FeedbackCategory[]
}

export async function getTeammateFeedback(
  teammateId: number
): Promise<ApiResponse<TeammateFeedback>> {
  const response = await getData<TeammateFeedback>(
    `${import.meta.env.VITE_API_URL}/feedback/${teammateId}`
  );
  return response;
}


export async function submitTeammateFeedback(
  request: TeammateFeedbackRequest
): Promise<ApiResponse<[]>> {
  const formattedFeedback = request.feedback.map((cat) => ({
    categoryId: cat.category.id,
    questions: cat.questions.map((q) => ({
      id: q.id,
      answer: {
        value: typeof q.answer?.value === "number" ? q.answer.value : 0,
        comment: typeof q.answer?.comment === "string" ? q.answer.comment : "",
      },
    })),
  }));

  const response = await postData<[]>(
    `${import.meta.env.VITE_API_URL}/feedback/${request.teammateId}`,
    JSON.stringify({
      feedback: formattedFeedback,
    })
  );

  return response;
}
