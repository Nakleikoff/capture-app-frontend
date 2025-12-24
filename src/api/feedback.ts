import { apiRequest, type ApiResponse } from './api-service';

export type FormAnswer = {
  value: number;
  comment?: string;
};

export type FormQuestion = {
  id: number;
  text: string;
  answer?: FormAnswer;
};

export type FormCategory = {
  id: number;
  name: string;
};

export type FormFeedbackCategory = {
  category: FormCategory;
  questions: FormQuestion[];
};

export type SubmittedAnswer = {
  value: number;
  comment: string;
};

export type SubmittedQuestion = {
  id: number;
  answer: SubmittedAnswer;
};

export type SubmittedFeedbackCategory = {
  categoryId: number;
  questions: SubmittedQuestion[];
};

export type TeammateFeedback = {
  teammate: { id: number; name: string };
  feedback: FormFeedbackCategory[];
};

export type TeammateFeedbackRequest = {
  teammateId: number;
  feedback: FormFeedbackCategory[];
};

export type TeammateFeedbackBody = {
  feedback: SubmittedFeedbackCategory[];
};

export async function getTeammateFeedback(
  teammateId: number,
): Promise<ApiResponse<TeammateFeedback>> {
  const response = await apiRequest<TeammateFeedback>(`feedback/${teammateId}`);
  return response;
}

export type SubmitTeammateFeedbackResponse = {
  reviewId: number;
};

export async function submitTeammateFeedback(
  request: TeammateFeedbackRequest,
): Promise<ApiResponse<SubmitTeammateFeedbackResponse>> {
  const formattedFeedback: SubmittedFeedbackCategory[] = request.feedback
    .map((cat) => ({
      categoryId: cat.category.id,
      questions: cat.questions
        .filter(
          (q) =>
            q.answer &&
            (q.answer.value === 1 ||
              q.answer.value === 0 ||
              q.answer.value === -1) &&
            typeof q.answer.comment === 'string' &&
            q.answer.comment.trim() !== '',
        )
        .map((q) => ({
          id: q.id,
          answer: {
            value: q.answer!.value,
            comment: q.answer!.comment!,
          },
        })),
    }))
    .filter((cat) => cat.questions.length > 0);

  const response = await apiRequest<
    SubmitTeammateFeedbackResponse,
    TeammateFeedbackBody
  >(
    `feedback/${request.teammateId}`,
    { feedback: formattedFeedback },
    'POST',
  );
  return response;
}
