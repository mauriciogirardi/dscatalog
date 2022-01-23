import jwtDecode from 'jwt-decode';
import { LoginResponse } from 'types/loginResponse';

type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

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
    return undefined;
  }
};
