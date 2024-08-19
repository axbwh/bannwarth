import React, { createContext, useState } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [isDone, setDone] = useState(false);

  return (
    <GlobalStateContext.Provider value={{ isDone, setDone }}>
      {children}
    </GlobalStateContext.Provider>
  );
};