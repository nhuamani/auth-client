export interface AuthResponse {
  success?: boolean;
  uid?: string;
  firstname?: string;
  lastname?: string;
  token?: string;
  message?: string;
}

export interface Usuario {
  uid: string;
  firstname: string;
  lastname: string;
}
