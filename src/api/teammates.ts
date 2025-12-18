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
  const teammatesResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/teammates`
  )

  if (!teammatesResponse.ok) {
    return {
      success: false,
      data: [],
    }
  }

  const { success, data } = await teammatesResponse.json()
  return { success, data }
}

export type CreateTeammateRequest = {
  name: string
}
export async function createTeammate(request: CreateTeammateRequest) {
  const createTeammateResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/teammates`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  )

  if (!createTeammateResponse.ok) {
    return {
      success: false,
    }
  }

  return { success: true }
}
