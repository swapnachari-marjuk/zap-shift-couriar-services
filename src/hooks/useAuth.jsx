import { use } from "react";
import { AuthContext } from "../contexs/AuthContext/AuthContext";

export const useAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};
