import { AuthUser } from './auth-user.model';

export interface ILoginSuccessResponse {
    error: Object;
    user: AuthUser;
}
