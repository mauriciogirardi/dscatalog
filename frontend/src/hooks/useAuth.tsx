import { useToast } from '@chakra-ui/react';
import { createContext, ReactNode, useContext, useState } from 'react';
import { requestLogin } from 'utils/requests';

interface SignInCredentials {
  username: string;
  password: string;
}

interface User {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFistName: string;
  userLastName: string;
  userId: number;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  isAuthenticated: boolean;
  user: User | undefined;
  loading: boolean;
}

const AuthContext = createContext({} as AuthContextData);

const localStorageKey = 'dsCatalogAuth';
let authChannel: BroadcastChannel;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  let isAuthenticated = false;
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>(() => {
    const data = localStorage.getItem(localStorageKey);

    if (data) {
      isAuthenticated = true;
      return JSON.parse(data);
    }

    isAuthenticated = false;
    return {} as User;
  });

  const signOut = () => {
    localStorage.removeItem(localStorageKey);
    authChannel.postMessage('signOut');
    isAuthenticated = false;
    setUser({} as User);
  };

  const signIn = async ({ password, username }: SignInCredentials) => {
    try {
      setLoading(true);
      const { data } = await requestLogin({
        password,
        username,
      });

      localStorage.setItem(localStorageKey, JSON.stringify(data));

      setUser(data);
    } catch (e) {
      console.error(e);
      toast({
        title: 'Erro',
        description: 'Erro ao fazer o login!',
        status: 'error',
        isClosable: true,
        position: 'bottom-left',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        signOut,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('must use AuthProvider');
  }

  return context;
};