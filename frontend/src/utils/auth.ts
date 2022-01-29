import jwtDecode from 'jwt-decode';
import { LoginResponse } from 'types/loginResponse';
import history from 'utils/history';
import { Role } from 'types/user';
import { ADMIN_AUTH } from 'constants/paths';

type TokenData = {
    exp: number;
    user_name: string;
    authorities: Role[];
};

export const getTokenData = (): TokenData | undefined => {
    try {
        const str = localStorage.getItem('dsCatalogAuth') ?? '{}';
        const { access_token } = JSON.parse(str) as LoginResponse;

        return jwtDecode(access_token) as TokenData;
    } catch (e) {
        console.error('getTokenData', e);
        history.push(ADMIN_AUTH);
        return undefined;
    }
};

export const hasAnyRoles = (roles: Role[]): boolean => {
    if (roles.length === 0) return true;

    const tokenData = getTokenData();

    if (tokenData !== undefined) {
        return roles.some((role) => tokenData.authorities.includes(role));
    }

    return false;
};

export const isAuthenticated = (): boolean => {
    const tokenData = getTokenData();
    return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};
