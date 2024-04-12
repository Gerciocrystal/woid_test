import { useContext } from "react";
import { AuthContext } from ".";

//Criando contexto do file index
export const UseAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
