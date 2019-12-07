import { AppUser } from 'src/models/auth/user';

export interface State {
  token: string;
  user: AppUser;
  emailTaken: boolean;
  isLoading: boolean;
  error: any;
}

export const initialState: State = {
  token: localStorage.getItem('token'),
  user: null,
  emailTaken: null,
  isLoading: false,
  error: null,
};
