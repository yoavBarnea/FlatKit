import { AuthUserProfile } from './auth-user-profile.model';

export interface AuthUser {
  "id": number ;
  "email": string;
  "profile": AuthUserProfile;
}
