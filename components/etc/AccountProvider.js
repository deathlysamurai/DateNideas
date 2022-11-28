import React, { useState, createContext } from "react";

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  const [state, setState] = useState({
    deleteClicked: false,
  });

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AccountContext, AccountProvider };