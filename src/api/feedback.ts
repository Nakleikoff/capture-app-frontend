import { getData, postData, type ApiResponse } from "./api-service"

export type Answer = {
  value: "yes" | "no" | "not_sure" | null
  comment: string | undefined
}

export type SubmittedAnswer = {
  value: number
  comment: string
}

export type SubmittedQuestion = { id: number; answer?: SubmittedAnswer }

type SubmittedFeedback = {
  categoryId: number;
  questions: SubmittedQuestion[];
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



  const formattedFeedback: SubmittedFeedback[] = request.feedback.map((cat) => ({
    categoryId: cat.category.id,
    questions: cat.questions
      .filter(
        (q) =>
          q.answer &&
          (q.answer.value === "yes" || q.answer.value === "no" || q.answer.value === "not_sure") &&
          typeof q.answer.comment === "string" &&
          q.answer.comment.trim() !== ""
      ).
      map((q) => ({
        id: q.id,
        answer: {
          value: q.answer!.value === "yes" ? 1 : q.answer!.value === "no" ? -1 : 0,
          comment: q.answer!.comment!
        }
      }))
  })).filter((cat) => cat.questions.length > 0);

  const response = await postData<[]>(
    `${import.meta.env.VITE_API_URL}/feedback/${request.teammateId}`,
    JSON.stringify({
      feedback: formattedFeedback,
    })
  );

  return response;
}
