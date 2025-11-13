import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

export const useAuth = () => {
  const authInfo = useContext(AuthContext);
  return authInfo;
};
