import { defineMock } from 'vite-plugin-mock-dev-server';

export default defineMock([
  {
    url: '/api/feedback/:id',
    method: 'GET',
    body: {
      success: true,
      data: {
        teammate: {
          id: 1,
          name: 'Nigel Gavin',
        },
        feedback: [
          {
            category: {
              id: 1,
              name: 'Communication',
            },
            questions: [
              {
                id: 1,
                text: 'Does the teammate communicate clearly and effectively?',
              },
              {
                id: 2,
                text: 'Does the teammate actively listen to others?',
              },
              {
                id: 3,
                text: 'Does the teammate provide timely updates?',
              },
            ],
          },
          {
            category: {
              id: 2,
              name: 'Technical Skills',
            },
            questions: [
              {
                id: 4,
                text: 'Does the teammate demonstrate strong technical abilities?',
              },
              {
                id: 5,
                text: 'Does the teammate write clean and maintainable code?',
              },
              {
                id: 6,
                text: 'Does the teammate stay current with technology trends?',
              },
            ],
          },
          {
            category: {
              id: 3,
              name: 'Teamwork',
            },
            questions: [
              {
                id: 7,
                text: 'Does the teammate collaborate well with others?',
              },
              {
                id: 8,
                text: 'Does the teammate support team members?',
              },
              {
                id: 9,
                text: 'Does the teammate contribute to team morale?',
              },
            ],
          },
          {
            category: {
              id: 4,
              name: 'Problem Solving',
            },
            questions: [
              {
                id: 10,
                text: 'Does the teammate approach problems analytically?',
              },
              {
                id: 11,
                text: 'Does the teammate find creative solutions?',
              },
              {
                id: 12,
                text: 'Does the teammate handle challenges effectively?',
              },
            ],
          },
        ],
      },
    },
  },
  {
    url: '/api/feedback/:id',
    method: 'POST',
    body: {
      success: true,
      data: {},
    },
  },
]);
