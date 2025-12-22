export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female';
  age: number;
  weight: number;
  height: number;
  activityLevel: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
  goal: 'Gain weight' | 'Lose weight' | 'Maintain weight';
  photo: string;
  createdAt: string;
}

export interface RegisterSuccessResponse {
  message: 'success';
  user: User;
  token: string;
}

export interface RegisterErrorResponse {
  error: string;
}

export type RegisterResponse =
  | RegisterSuccessResponse
  | RegisterErrorResponse;
