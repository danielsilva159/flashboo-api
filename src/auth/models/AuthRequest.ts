export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export interface AuthRequest extends Request {
  user: User;
}
