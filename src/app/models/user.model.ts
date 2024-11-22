import { IRoles } from './role.model';

export interface IUser extends IUserInfo {
  isAuthenticated: Boolean;
}

export interface IUserInfo {
  id: string;
  username: string;
  email?: string;
  number?: string;
  first_name?: string;
  last_name?: string;
}
