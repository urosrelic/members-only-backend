export interface CreateUserRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profile_picture: string;
}

export interface UserLoginBody {
  email: string;
  password: string;
}
