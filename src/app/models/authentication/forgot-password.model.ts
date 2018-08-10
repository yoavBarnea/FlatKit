
export interface IForgotPasswordRequest {
  email: string;
}

export interface IForgotPasswordResponse {
  error: null |  {
    code: number;
    descreption: string;
  }  ;

}



