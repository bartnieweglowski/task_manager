// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [assignedUser, setAssignedUser] = useState(null);

  return (
    <UserContext.Provider value={{ assignedUser, setAssignedUser }}>
      {children}
    </UserContext.Provider>
  );
};
