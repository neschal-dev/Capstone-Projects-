type Role = "USER" | "ADMIN";

export type User = {
  id: string; // uuid
  username: string;
  email: string;
  role: Role;
  created_at: Date;
};

export type DBUser = User;

export type DBUserWithPasswordRow = User & {
  hashed_password: string | null;
};
export type TokenPayload = {
  userId: string;
  email: string;
  role: string;
};
