export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profile_picture: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}
