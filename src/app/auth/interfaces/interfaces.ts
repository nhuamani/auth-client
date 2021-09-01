export interface AuthResponse {
  success: boolean;
  uid?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  token?: string;
  newtoken?: string;
  message?: string;
}

export interface Usuario {
  uid: string;
  email: string;
  firstname: string;
  lastname: string;
}
