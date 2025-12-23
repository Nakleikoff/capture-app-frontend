import { defineMock } from 'vite-plugin-mock-dev-server'

const teammates: {id: number, name: string}[] = [
    {
        id: 1,
        name: 'Yoda'
    }
];

export default defineMock([{
    url: '/api/teammates',
    method: 'GET',
    body: {
        success: true,
        data: { teammates },
    }
}, {
    url: '/api/teammates',
    method: 'POST',
    body: (params) => {
        const teammate = { ...params.body.teammate, id: 2 };
        teammates.push(teammate);
        return {
            success: true,
            data: {
                teammate 
            },
        }
    }
}])