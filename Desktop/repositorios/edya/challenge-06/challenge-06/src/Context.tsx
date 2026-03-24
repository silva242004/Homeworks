import { createContext, useState, ReactNode } from "react";

type AuthContextType = {
  user: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (email: string, password: string) => {
    if (email === "user@mail.com" && password === "123") {
      setUser(email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};