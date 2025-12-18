export type Teammate = {
  id: number
  name: string
}

export type TeammatesResponse = {
  success: boolean
  data: Teammate[]
}

const delay = (ms: number) => {
  return new Promise<void>((res) => setTimeout(res, ms))
}

export async function getTeammates(): Promise<TeammatesResponse> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/teammates`)

  if (!response.ok) {
    return {
      success: false,
      data: [],
    }
  }

  const { success, data } = await response.json()

  const dummyData: TeammatesResponse = {
    success: true,
    data: [
      {
        id: 1,
        name: "Mitchell",
      },
      {
        id: 2,
        name: "Luke",
      },
      {
        id: 3,
        name: "Lesego",
      },
      {
        id: 4,
        name: "Nigel",
      },
      {
        id: 5,
        name: "Saxon",
      },
      {
        id: 6,
        name: "Alexey",
      },
    ],
  }
  return {
    success,
    data,
  }
}

export type CreateTeammateRequest = {
  name: string
}
export async function createTeammate(request: CreateTeammateRequest) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/teammates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    console.error(response)
    return {
      success: false,
    }
  }

  return { success: true }
}
