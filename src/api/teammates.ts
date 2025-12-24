import { getData, postData, type ApiResponse } from './api-service';

export type Teammate = {
  id: number;
  name: string;
};

export type TeammateResponse = {
  teammates: Teammate[];
};

export async function getTeammates(): Promise<ApiResponse<TeammateResponse>> {
  const response = await getData<TeammateResponse>(
    `${import.meta.env.VITE_API_URL}/teammates`,
  );

  return response;
}

export type CreateTeammateRequest = {
  name: string;
};

export type CreateTeammateResponse = {
  teammate: Teammate;
};

export async function createTeammate(
  request: CreateTeammateRequest,
): Promise<ApiResponse<CreateTeammateResponse>> {
  const response = await postData<CreateTeammateResponse>(
    `${import.meta.env.VITE_API_URL}/teammates`,
    JSON.stringify({ teammate: { name: request.name } }),
  );

  return response;
}
