
export interface AppUser {
  firstname: string;
  lastname: string;
  email: string;
}

export type AuthenticatedUser = AppUser & {
  token: string
};
