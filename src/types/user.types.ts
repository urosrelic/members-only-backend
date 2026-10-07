export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profile_picture?: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
  user_roles: {
    role: {
      name: string;
    }
  }[]
}
