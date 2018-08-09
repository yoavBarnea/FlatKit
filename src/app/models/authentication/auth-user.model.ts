import { IAuthUserProfile } from './auth-user-profile.model';

export interface IAuthUser {
  "id": number ;
  "email": string;
  "profile": IAuthUserProfile;
}
