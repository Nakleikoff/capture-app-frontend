export type Teammate = {
  id: number
  name: string
}

export type TeammatesResponse = {
  success: boolean
  data: {
    list: Teammate[]
  }
}

const delay = (ms: number) => {
  return new Promise<void>((res) => setTimeout(res, ms))
}

export async function getTeammates(): Promise<TeammatesResponse> {
  const response = {
    success: true,
    data: {
      list: [
        {
          id: 1,
          name: "Mitchell",
        },
        { id: 2, name: "Luke" },
        { id: 3, name: "Lesego" },
        { id: 4, name: "Nigel" },
        { id: 5, name: "Saxon" },
        { id: 6, name: "Alexey" },
      ],
    },
  }

  await delay(1000)

  return response
}

export type CreateTeammateRequest = {
  name: string
}
export async function createTeammate(request: CreateTeammateRequest) {
  await delay(1000)
  console.log("submitted", request)
  return { success: true }
}
