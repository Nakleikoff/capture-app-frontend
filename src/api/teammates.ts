import { apiRequest, type ApiResponse } from './api-service';

export type Teammate = {
  id: number;
  name: string;
};

export type TeammateResponse = {
  teammates: Teammate[];
};

export async function getTeammates(): Promise<ApiResponse<TeammateResponse>> {
  const response = await apiRequest<TeammateResponse>(
    `teammates`,
  );

  return response;
}

export type CreateTeamMateBody = {
  teammate: {
    name: string
  };
};

export type CreateTeammateResponse = {
  teammate: Teammate;
};

export async function createTeammate(
  name: string,
): Promise<ApiResponse<CreateTeammateResponse>> {
  const response = await apiRequest<CreateTeammateResponse, CreateTeamMateBody>(
    `teammates`,
    { teammate: { name } },
    'POST'
  );

  return response;
}
