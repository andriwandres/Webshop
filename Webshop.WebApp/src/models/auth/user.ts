
export interface AppUser {
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
}

export type AuthenticatedUser = AppUser & {
  token: string
};
