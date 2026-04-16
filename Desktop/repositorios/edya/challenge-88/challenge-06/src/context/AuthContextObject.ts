import { createContext } from "react";
import type { User, UserCredential } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<UserCredential | null>;
  register: (email: string, password: string) => Promise<UserCredential | null>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
