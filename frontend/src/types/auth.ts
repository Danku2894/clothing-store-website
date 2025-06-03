export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  district?: string;
  ward?: string;
  role: string;
  status?: 'ACTIVE' | 'INACTIVE';
  createdAt?: string;
}

export interface IUserAdmin extends Omit<IUser, 'firstName' | 'lastName'> {
  fullName: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  refreshToken: string;
  user: IUser;
}

export interface IAuthContext {
  user: IUser | null;
  accessToken: string | null;
  login: (credentials: ILoginRequest) => Promise<void>;
  register: (data: IRegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}