export type Answer = { value: "yes" | "no" | "not_sure" | undefined, comment: string | undefined };

export type Question = { id: number, text: string, answer?: Answer };

export type FeedbackCategory = { id: number, categoryName: string, questions: Question[] };

export type TeammateFeedbackResponse = {
    success: boolean,
    data: {
        teammate: { id: number, name: string },
        feedback: FeedbackCategory[]
    }
};

export type TeammateFeedbackRequest = {
    teammateId: number;
    feedback: FeedbackCategory[];
}

export async function getMockTeammateFeedback(teammateId: number): Promise<TeammateFeedbackResponse> {

    let data: FeedbackCategory[] = []

    if (teammateId === 1) {
        data = [
            {
                id: 101,
                categoryName: "Performance",
                questions: [
                    { id: 1, text: "Did you meet your performance goals for this period?", answer: { value: "yes", comment: "Exceeded expectations." } },
                    { id: 2, text: "Did you collaborate effectively with your team?", answer: { value: "no", comment: "Needs improvement." } },
                    { id: 3, text: "Did you complete your assigned tasks on time?", answer: { value: "yes", comment: "All tasks delivered early." } },
                    { id: 4, text: "Did you show initiative in your work?", answer: { value: "yes", comment: "Proactively solved problems." } }
                ]
            },
            {
                id: 102,
                categoryName: "Values",
                questions: [
                    { id: 8, text: "Did you support company values in your daily work?", answer: { value: "yes", comment: "Always aligned." } },
                    { id: 9, text: "Did you support personal values in your daily work?", answer: { value: "not_sure", comment: "Sometimes." } },
                    { id: 10, text: "Did you help foster a positive team culture?", answer: { value: "yes", comment: "Encouraged others regularly." } }
                ]
            },
            {
                id: 103,
                categoryName: "Growth",
                questions: [
                    { id: 11, text: "Did you seek feedback to improve your work?", answer: { value: "yes", comment: "Asked for feedback from peers." } },
                    { id: 12, text: "Did you participate in training or learning opportunities?", answer: { value: "no", comment: "No time this quarter." } },
                    { id: 13, text: "Did you mentor or help others grow?", answer: { value: "yes", comment: "Mentored two new hires." } }
                ]
            },
            {
                id: 104,
                categoryName: "Engagement",
                questions: [
                    { id: 14, text: "Did you attend team meetings regularly?", answer: { value: "yes", comment: "Perfect attendance." } },
                    { id: 15, text: "Did you contribute ideas in meetings?", answer: { value: "no", comment: "Prefer to listen." } },
                    { id: 16, text: "Did you volunteer for new projects?", answer: { value: "not_sure", comment: "Sometimes, if available." } }
                ]
            }]
    } else if (teammateId === 2) {
        data = [
            {
                id: 201,
                categoryName: "Performance",
                questions: [
                    { id: 21, text: "Did you meet your performance goals for this period?", answer: { value: "no", comment: "Missed several goals this quarter." } },
                    { id: 22, text: "Did you collaborate effectively with your team?", answer: { value: "yes", comment: "Excellent team player." } },
                    { id: 23, text: "Did you complete your assigned tasks on time?", answer: { value: "not_sure", comment: "Some tasks delayed due to dependencies." } }
                ]
            },
            {
                id: 202,
                categoryName: "Values",
                questions: [
                    { id: 24, text: "Did you support company values in your daily work?", answer: { value: "yes", comment: "Consistently demonstrates company values." } },
                    { id: 25, text: "Did you support personal values in your daily work?", answer: { value: "yes", comment: "Personal values align with work." } }
                ]
            },
            {
                id: 203,
                categoryName: "Growth",
                questions: [
                    { id: 26, text: "Did you seek feedback to improve your work?", answer: { value: "no", comment: "Rarely asks for feedback." } },
                    { id: 27, text: "Did you participate in training or learning opportunities?", answer: { value: "yes", comment: "Completed two online courses." } }
                ]
            },
            {
                id: 204,
                categoryName: "Engagement",
                questions: [
                    { id: 28, text: "Did you attend team meetings regularly?", answer: { value: "yes", comment: "Attended all meetings." } },
                    { id: 29, text: "Did you contribute ideas in meetings?", answer: { value: "yes", comment: "Frequently shares ideas." } },
                    { id: 30, text: "Did you volunteer for new projects?", answer: { value: "not_sure", comment: "Volunteered once." } }
                ]
            }
        ];
    } else if (teammateId === 3) {
        data = [
            {
                id: 301,
                categoryName: "Performance",
                questions: [
                    { id: 31, text: "Did you meet your performance goals for this period?", answer: { value: "yes", comment: "Met all goals with high quality." } },
                    { id: 32, text: "Did you collaborate effectively with your team?", answer: { value: "not_sure", comment: "Worked mostly independently." } }
                ]
            },
            {
                id: 302,
                categoryName: "Values",
                questions: [
                    { id: 33, text: "Did you support company values in your daily work?", answer: { value: "no", comment: "Needs improvement in this area." } }
                ]
            },
            {
                id: 303,
                categoryName: "Growth",
                questions: [
                    { id: 34, text: "Did you seek feedback to improve your work?", answer: { value: "yes", comment: "Actively seeks feedback." } },
                    { id: 35, text: "Did you participate in training or learning opportunities?", answer: { value: "yes", comment: "Attended multiple workshops." } }
                ]
            },
            {
                id: 304,
                categoryName: "Engagement",
                questions: [
                    { id: 36, text: "Did you attend team meetings regularly?", answer: { value: "no", comment: "Missed several meetings." } },
                    { id: 37, text: "Did you contribute ideas in meetings?", answer: { value: "not_sure", comment: "Occasionally shares ideas." } }
                ]
            }
        ];
    }

    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                success: true,
                data: {
                    teammate: { id: 1, name: "Jane Doe" },
                    feedback: data
                }
            });
        }, 500);
    });
}


export async function submitTeammateFeedback(request: TeammateFeedbackRequest): Promise<{ success: boolean }> {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Submitted:", request);
            resolve({ success: true });
        }, 500);
    })
}