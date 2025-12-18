import { getData, postData, type ApiResponse } from "./api-service"

export type Answer = {
  value: "yes" | "no" | "not_sure" | null
  comment: string | undefined
}

export type Question = { id: number; text: string; answer?: Answer }

export type FeedbackCategory = {
  id: number
  categoryName: string
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

export async function getMockTeammateFeedback(
  teammateId: number
): Promise<ApiResponse<TeammateFeedback>> {
  const teamMatesKey: Record<number, string> = {
    1: "Mitchell",
    2: "Luke",
    3: "Lesego",
    4: "Nigel",
    5: "Saxon",
    6: "Alexey",
  }

  let data: FeedbackCategory[] = []

  if (teammateId === 1) {
    data = [
      {
        id: 101,
        categoryName: "Performance",
        questions: [
          {
            id: 1,
            text: "Did Mitchell meet his performance goals for this period?",
            answer: { value: null, comment: "Exceeded expectations." },
          },
          {
            id: 2,
            text: "Did Mitchell collaborate effectively with his team?",
            answer: { value: "no", comment: "Needs improvement." },
          },
          {
            id: 4,
            text: "Did Mitchell show initiative in his work?",
            answer: { value: "yes", comment: "Proactively solved problems." },
          },
        ],
      },
      {
        id: 102,
        categoryName: "Values",
        questions: [
          {
            id: 8,
            text: "Did Mitchell support company values in his daily work?",
            answer: { value: "yes", comment: "Always aligned." },
          },
          {
            id: 9,
            text: "Did Mitchell support personal values in his daily work?",
            answer: { value: "not_sure", comment: "Sometimes." },
          },
          {
            id: 10,
            text: "Did Mitchell help foster a positive team culture?",
            answer: { value: "yes", comment: "Encouraged others regularly." },
          },
        ],
      },
      {
        id: 103,
        categoryName: "Growth",
        questions: [
          {
            id: 11,
            text: "Did Mitchell seek feedback to improve his work?",
            answer: { value: "yes", comment: "Asked for feedback from peers." },
          },
          {
            id: 12,
            text: "Did Mitchell participate in training or learning opportunities?",
            answer: { value: "no", comment: "No time this quarter." },
          },
          {
            id: 13,
            text: "Did Mitchell mentor or help others grow?",
            answer: { value: "yes", comment: "Mentored two new hires." },
          },
        ],
      },
      {
        id: 104,
        categoryName: "Engagement",
        questions: [
          {
            id: 14,
            text: "Did Mitchell attend team meetings regularly?",
            answer: { value: "yes", comment: "Perfect attendance." },
          },
          {
            id: 15,
            text: "Did Mitchell contribute ideas in meetings?",
            answer: { value: "no", comment: "Prefer to listen." },
          },
          {
            id: 16,
            text: "Did Mitchell volunteer for new projects?",
            answer: { value: "not_sure", comment: "Sometimes, if available." },
          },
        ],
      },
    ]
  } else if (teammateId === 2) {
    data = [
      {
        id: 201,
        categoryName: "Performance",
        questions: [
          {
            id: 21,
            text: "Did Luke meet his performance goals for this period?",
            answer: {
              value: "no",
              comment: "Missed several goals this quarter.",
            },
          },
          {
            id: 22,
            text: "Did Luke collaborate effectively with his team?",
            answer: { value: "yes", comment: "Excellent team player." },
          },
          {
            id: 23,
            text: "Did Luke complete his assigned tasks on time?",
            answer: {
              value: "not_sure",
              comment: "Some tasks delayed due to dependencies.",
            },
          },
        ],
      },
      {
        id: 202,
        categoryName: "Values",
        questions: [
          {
            id: 24,
            text: "Did Luke support company values in his daily work?",
            answer: {
              value: "yes",
              comment: "Consistently demonstrates company values.",
            },
          },
          {
            id: 25,
            text: "Did Luke support personal values in his daily work?",
            answer: {
              value: "yes",
              comment: "Personal values align with work.",
            },
          },
        ],
      },
      {
        id: 203,
        categoryName: "Growth",
        questions: [
          {
            id: 26,
            text: "Did Luke seek feedback to improve his work?",
            answer: { value: "no", comment: "Rarely asks for feedback." },
          },
          {
            id: 27,
            text: "Did Luke participate in training or learning opportunities?",
            answer: { value: "yes", comment: "Completed two online courses." },
          },
        ],
      },
      {
        id: 204,
        categoryName: "Engagement",
        questions: [
          {
            id: 28,
            text: "Did Luke attend team meetings regularly?",
            answer: { value: "yes", comment: "Attended all meetings." },
          },
          {
            id: 29,
            text: "Did Luke contribute ideas in meetings?",
            answer: { value: "yes", comment: "Frequently shares ideas." },
          },
          {
            id: 30,
            text: "Did Luke volunteer for new projects?",
            answer: { value: "not_sure", comment: "Volunteered once." },
          },
        ],
      },
    ]
  } else if (teammateId === 3) {
    data = [
      {
        id: 301,
        categoryName: "Performance",
        questions: [
          {
            id: 31,
            text: "Did Lesego meet his performance goals for this period?",
            answer: {
              value: "yes",
              comment: "Met all goals with high quality.",
            },
          },
          {
            id: 32,
            text: "Did Lesego collaborate effectively with his team?",
            answer: {
              value: "not_sure",
              comment: "Worked mostly independently.",
            },
          },
        ],
      },
      {
        id: 302,
        categoryName: "Values",
        questions: [
          {
            id: 33,
            text: "Did Lesego support company values in his daily work?",
            answer: { value: "no", comment: "Needs improvement in this area." },
          },
        ],
      },
      {
        id: 303,
        categoryName: "Growth",
        questions: [
          {
            id: 34,
            text: "Did Lesego seek feedback to improve his work?",
            answer: { value: "yes", comment: "Actively seeks feedback." },
          },
          {
            id: 35,
            text: "Did Lesego participate in training or learning opportunities?",
            answer: { value: "yes", comment: "Attended multiple workshops." },
          },
        ],
      },
      {
        id: 304,
        categoryName: "Engagement",
        questions: [
          {
            id: 36,
            text: "Did Lesego attend team meetings regularly?",
            answer: { value: "no", comment: "Missed several meetings." },
          },
          {
            id: 37,
            text: "Did Lesego contribute ideas in meetings?",
            answer: {
              value: "not_sure",
              comment: "Occasionally shares ideas.",
            },
          },
        ],
      },
    ]
  } else if (teammateId === 4) {
    data = [
      {
        id: 401,
        categoryName: "Performance",
        questions: [
          {
            id: 41,
            text: "Did Nigel meet his performance goals for this period?",
            answer: { value: "yes", comment: "Consistently strong performer." },
          },
          {
            id: 42,
            text: "Did Nigel collaborate effectively with his team?",
            answer: { value: "yes", comment: "Great team spirit." },
          },
          {
            id: 43,
            text: "Did Nigel complete his assigned tasks on time?",
            answer: { value: "yes", comment: "Always on schedule." },
          },
        ],
      },
      {
        id: 402,
        categoryName: "Values",
        questions: [
          {
            id: 44,
            text: "Did Nigel support company values in his daily work?",
            answer: { value: "yes", comment: "Role model for values." },
          },
          {
            id: 45,
            text: "Did Nigel support personal values in his daily work?",
            answer: { value: "yes", comment: "Very principled." },
          },
        ],
      },
      {
        id: 403,
        categoryName: "Growth",
        questions: [
          {
            id: 46,
            text: "Did Nigel seek feedback to improve his work?",
            answer: { value: "yes", comment: "Frequently requests feedback." },
          },
          {
            id: 47,
            text: "Did Nigel participate in training or learning opportunities?",
            answer: { value: "yes", comment: "Attended several workshops." },
          },
        ],
      },
      {
        id: 404,
        categoryName: "Engagement",
        questions: [
          {
            id: 48,
            text: "Did Nigel attend team meetings regularly?",
            answer: { value: "yes", comment: "Never missed a meeting." },
          },
          {
            id: 49,
            text: "Did Nigel contribute ideas in meetings?",
            answer: { value: "yes", comment: "Always has suggestions." },
          },
          {
            id: 50,
            text: "Did Nigel volunteer for new projects?",
            answer: { value: "yes", comment: "Eager to help." },
          },
        ],
      },
    ]
  } else if (teammateId === 5) {
    data = [
      {
        id: 501,
        categoryName: "Performance",
        questions: [
          {
            id: 51,
            text: "Did Saxon meet his performance goals for this period?",
            answer: { value: "not_sure", comment: "Some goals met, some not." },
          },
          {
            id: 52,
            text: "Did Saxon collaborate effectively with his team?",
            answer: { value: "yes", comment: "Very supportive." },
          },
          {
            id: 53,
            text: "Did Saxon complete his assigned tasks on time?",
            answer: { value: "no", comment: "Occasional delays." },
          },
        ],
      },
      {
        id: 502,
        categoryName: "Values",
        questions: [
          {
            id: 54,
            text: "Did Saxon support company values in his daily work?",
            answer: { value: "yes", comment: "Good example for others." },
          },
          {
            id: 55,
            text: "Did Saxon support personal values in his daily work?",
            answer: { value: "not_sure", comment: "Sometimes." },
          },
        ],
      },
      {
        id: 503,
        categoryName: "Growth",
        questions: [
          {
            id: 56,
            text: "Did Saxon seek feedback to improve his work?",
            answer: { value: "no", comment: "Rarely asks for feedback." },
          },
          {
            id: 57,
            text: "Did Saxon participate in training or learning opportunities?",
            answer: { value: "yes", comment: "Completed a certification." },
          },
        ],
      },
      {
        id: 504,
        categoryName: "Engagement",
        questions: [
          {
            id: 58,
            text: "Did Saxon attend team meetings regularly?",
            answer: { value: "yes", comment: "Usually present." },
          },
          {
            id: 59,
            text: "Did Saxon contribute ideas in meetings?",
            answer: { value: "not_sure", comment: "Occasionally." },
          },
          {
            id: 60,
            text: "Did Saxon volunteer for new projects?",
            answer: { value: "no", comment: "Prefers current workload." },
          },
        ],
      },
    ]
  } else if (teammateId === 6) {
    data = [
      {
        id: 601,
        categoryName: "Performance",
        questions: [
          {
            id: 61,
            text: "Did Alexey meet his performance goals for this period?",
            answer: { value: "yes", comment: "Outstanding results." },
          },
          {
            id: 62,
            text: "Did Alexey collaborate effectively with his team?",
            answer: { value: "yes", comment: "Excellent communicator." },
          },
          {
            id: 63,
            text: "Did Alexey complete his assigned tasks on time?",
            answer: { value: "yes", comment: "Always delivers on time." },
          },
        ],
      },
      {
        id: 602,
        categoryName: "Values",
        questions: [
          {
            id: 64,
            text: "Did Alexey support company values in his daily work?",
            answer: { value: "yes", comment: "Highly values-driven." },
          },
          {
            id: 65,
            text: "Did Alexey support personal values in his daily work?",
            answer: { value: "yes", comment: "Very consistent." },
          },
        ],
      },
      {
        id: 603,
        categoryName: "Growth",
        questions: [
          {
            id: 66,
            text: "Did Alexey seek feedback to improve his work?",
            answer: { value: "yes", comment: "Always open to feedback." },
          },
          {
            id: 67,
            text: "Did Alexey participate in training or learning opportunities?",
            answer: { value: "yes", comment: "Pursues continuous learning." },
          },
        ],
      },
      {
        id: 604,
        categoryName: "Engagement",
        questions: [
          {
            id: 68,
            text: "Did Alexey attend team meetings regularly?",
            answer: { value: "yes", comment: "Never absent." },
          },
          {
            id: 69,
            text: "Did Alexey contribute ideas in meetings?",
            answer: { value: "yes", comment: "Drives innovation." },
          },
          {
            id: 70,
            text: "Did Alexey volunteer for new projects?",
            answer: { value: "yes", comment: "Always volunteers." },
          },
        ],
      },
    ]
  }

  // const response = await getData<TeammateFeedback>(
  //   `${import.meta.env.VITE_API_URL}/feedback/${teammateId}`
  // )

  // return response

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          teammate: {
            id: teammateId,
            name: teamMatesKey[teammateId] || "Unknown",
          },
          feedback: data,
        },
      })
    }, 500)
  })
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
