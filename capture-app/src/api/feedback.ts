export type Answer = { value: "yes" | "no" | "not_sure" | undefined, comment: string | undefined };

export type Question = { id: number, text: string, answer?: Answer };

export type FeedbackCategory = { id: number, name: string, questions: Question[] };

export type TeammateFeedbackResponse = {
    success: boolean,
    data: {
        teammate: { id: number, name: string },
        feedback: FeedbackCategory[]
    }
};

export async function getMockTeammateFeedback(): Promise<TeammateFeedbackResponse> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                success: true,
                data: {
                    teammate: { id: 1, name: "Jane Doe" },
                    feedback: [
                        {
                            id: 101,
                            name: "Performance",
                            questions: [
                                { id: 1, text: "Did you meet your performance goals for this period?", answer: { value: "yes", comment: "Exceeded expectations." } },
                                { id: 2, text: "Did you collaborate effectively with your team?", answer: { value: "no", comment: "Needs improvement." } },
                                { id: 3, text: "Did you complete your assigned tasks on time?", answer: { value: "yes", comment: "All tasks delivered early." } },
                                { id: 4, text: "Did you show initiative in your work?", answer: { value: "yes", comment: "Proactively solved problems." } }
                            ]
                        },
                        {
                            id: 102,
                            name: "Values",
                            questions: [
                                { id: 8, text: "Did you support company values in your daily work?", answer: { value: "yes", comment: "Always aligned." } },
                                { id: 9, text: "Did you support personal values in your daily work?", answer: { value: "not_sure", comment: "Sometimes." } },
                                { id: 10, text: "Did you help foster a positive team culture?", answer: { value: "yes", comment: "Encouraged others regularly." } }
                            ]
                        },
                        {
                            id: 103,
                            name: "Growth",
                            questions: [
                                { id: 11, text: "Did you seek feedback to improve your work?", answer: { value: "yes", comment: "Asked for feedback from peers." } },
                                { id: 12, text: "Did you participate in training or learning opportunities?", answer: { value: "no", comment: "No time this quarter." } },
                                { id: 13, text: "Did you mentor or help others grow?", answer: { value: "yes", comment: "Mentored two new hires." } }
                            ]
                        },
                        {
                            id: 104,
                            name: "Engagement",
                            questions: [
                                { id: 14, text: "Did you attend team meetings regularly?", answer: { value: "yes", comment: "Perfect attendance." } },
                                { id: 15, text: "Did you contribute ideas in meetings?", answer: { value: "no", comment: "Prefer to listen." } },
                                { id: 16, text: "Did you volunteer for new projects?", answer: { value: "not_sure", comment: "Sometimes, if available." } }
                            ]
                        }
                    ]
                }
            });
        }, 500);
    });
}