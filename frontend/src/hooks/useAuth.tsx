import { useToast } from '@chakra-ui/react';
import { ADMIN, HOME } from 'constants/paths';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { requestLogin } from 'api/requests';

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

interface LocationState {
    from: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextData {
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    user: User | undefined;
    loading: boolean;
}

const AuthContext = createContext({} as AuthContextData);

const localStorageKey = 'dsCatalogAuth';

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>(() => {
        const data = localStorage.getItem(localStorageKey);

        if (data) {
            return JSON.parse(data);
        }

        return {} as User;
    });

    const { from } = (location.state as LocationState) || {
        from: { pathname: ADMIN },
    };

    const signOut = () => {
        localStorage.removeItem(localStorageKey);
        navigate(HOME);
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
            navigate(from);
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
