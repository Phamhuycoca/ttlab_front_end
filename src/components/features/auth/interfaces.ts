import { Gender, ProfileType, Role } from '@/common/constants';
import { IUser, IUserProfile } from '@/common/interfaces';

export type IBodyLogin = {
  email?: string;
  password?: string;
  code?: string;
  redirectUri?: string;
};

export type ILoginResponse = {
  accessToken: string;
  expiresIn: number;
  refresh_token: string;
  refresh_expiresIn:number;
  profile:IUser;
};
export interface IUserActiveAccountBody {
  code: string;
  email: string;
}

export interface IUserChangePassword {
  password?: string;
  code: string;
  email: string;
}

export interface IDomain {
  name: string;
  id: string;
}

export interface IVerifyRegistrationBody {
  email: string;
  code: string;
}

export interface IVerifyResentEmail {
  email: string;
}

export interface IMaster {
  id: string;
  name: string;
  type?: ProfileType;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: Gender;
  avatar?: string;
  userRole: Role;
  features?: string;
}

export interface IUserUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IGoogleLoginLinkParams {
  redirectUri: string;
  scopes: string[];
}

export interface IGoogleLoginLinkResponse {
  link: string;
  redirectUri: string;
}
