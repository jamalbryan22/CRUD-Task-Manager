import React, { createContext, useState } from 'react';

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [taskStore, setTaskStore] = useState([{}]);
  const [userId, setUserId] = useState("");
  return (
    <UserContext.Provider
      value={{
        taskStore,
        userId, 
        setUserId,
        setTaskStore,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};