export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profile_picture?: string | null;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  user_roles: {
    role: {
      name: string;
    }
  }[]
}
