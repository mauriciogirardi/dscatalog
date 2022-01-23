export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userId: number;
  firstName: string;
  lastName: string;
};
