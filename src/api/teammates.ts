import { getData, postData, type ApiResponse } from "./api-service"

export type Teammate = {
  id: number
  name: string
}

const delay = (ms: number) => {
  return new Promise<void>((res) => setTimeout(res, ms))
}

export async function getTeammates(): Promise<ApiResponse<Teammate[]>> {
  const response = await getData<Teammate[]>(
    `${import.meta.env.VITE_API_URL}/teammates`
  )

  return response
}

export type CreateTeammateRequest = {
  name: string
}
export async function createTeammate(
  request: CreateTeammateRequest
): Promise<ApiResponse<[]>> {
  const response = await postData<[]>(
    `${import.meta.env.VITE_API_URL}/teammates`,
    JSON.stringify(request)
  )

  return response
}
