import { createContext, useContext, ReactNode, useState } from 'react';

interface ShowPasswordProviderProps {
  children: ReactNode;
}

interface ShowPasswordContextData {
  showPassword: boolean;
  handleClick: () => void;
}

const ShowPasswordContext = createContext({} as ShowPasswordContextData);

export function ShowPasswordProvider({ children }: ShowPasswordProviderProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => setShowPassword((prevState) => !prevState);

  return (
    <ShowPasswordContext.Provider value={{ showPassword, handleClick }}>
      {children}
    </ShowPasswordContext.Provider>
  );
}

export function useShowPassword(): ShowPasswordContextData {
  return useContext(ShowPasswordContext);
}
