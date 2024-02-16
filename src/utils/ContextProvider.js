import { useState } from "react";
import { ModalContext } from "./ModalContext";
import React from 'react';


const ContextProvider = ({ children }) => {





  return (
    <ModalContext.Provider
      value={{

      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ContextProvider;
