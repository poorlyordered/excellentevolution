import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      avatarUrl?: string | null;
    };
  }
  interface User extends DefaultUser {
    avatarUrl?: string | null;
  }
}