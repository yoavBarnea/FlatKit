import { IAuthUser } from './auth-user.model';

export interface ILoginSuccessResponse {
    error: Object;
    user?: IAuthUser;
}
