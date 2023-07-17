import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

import type { KeypadInputResult } from 'pages/remotes';

type Props = {
  children: React.ReactNode;
};

type Password = KeypadInputResult;
type PasswordCheck = KeypadInputResult;

type PasswordContextValue = {
  password: Password;
  passwordCheck: PasswordCheck;
  setPassword: Dispatch<SetStateAction<Password>>;
  setPasswordCheck: Dispatch<SetStateAction<PasswordCheck>>;
};

const DEFAULT_RESULT = { uid: '', coords: [] };

const PasswordContext = createContext<PasswordContextValue>({
  password: DEFAULT_RESULT,
  passwordCheck: DEFAULT_RESULT,
  setPassword: () => {},
  setPasswordCheck: () => {},
});

export function PasswordContextProvider({ children }: Props) {
  const [password, setPassword] = useState<Password>(DEFAULT_RESULT);
  const [passwordCheck, setPasswordCheck] = useState<PasswordCheck>(DEFAULT_RESULT);

  return (
    <PasswordContext.Provider value={{ password, passwordCheck, setPassword, setPasswordCheck }}>
      {children}
    </PasswordContext.Provider>
  );
}

export const usePassword = () => {
  return useContext(PasswordContext);
};
