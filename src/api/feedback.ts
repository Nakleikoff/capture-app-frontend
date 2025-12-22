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
      `${import.meta.env.VITE_API_URL}/feedback/${teammateId}`,
    )
    return response;
}


export async function submitTeammateFeedback(
  request: TeammateFeedbackRequest
): Promise<ApiResponse<[]>> {
  // const response = await postData<[]>(
  //   `${import.meta.env.VITE_API_URL}/feedback/${request.teammateId}`,
  //   JSON.stringify({
  //     feedback: request.feedback,
  //   })
  // )

  // return response

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Submitted:", request)
      resolve({ success: true, data: [] })
    }, 500)
  })
}
