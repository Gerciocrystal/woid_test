import React, { createContext, useEffect, useState } from "react";
//criando contexto
export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [newPost, setNewPost] = useState({});
  const [fetchAgain, setFecthAgain] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        newPost,
        setNewPost,
        fetchAgain,
        setFecthAgain,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
