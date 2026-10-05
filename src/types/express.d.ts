import { AuthUser } from "./user.types";

declare global {
  namespace Express {
    interface User extends AuthUser {}
  }
}

export {};
