import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context/AuthContextObject";

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }

  return context;
};
