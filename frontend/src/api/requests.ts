import axios, { AxiosRequestConfig } from 'axios';
import { ADMIN_AUTH } from 'constants/paths';
import qs from 'qs';

import { LoginData } from 'types/login';
import { Role } from 'types/user';
import { getTokenData } from 'utils/getTokenData';
import history from 'utils/history';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog-client';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog-secret';

export const api = axios.create({
    baseURL: BASE_URL,
});

export default async function requestData<T>({
    ...config
}: AxiosRequestConfig): Promise<T | undefined> {
    try {
        const user = localStorage.getItem('dsCatalogAuth') ?? '{}';
        const { access_token } = JSON.parse(user);

        const headers = config.withCredentials
            ? {
                  ...config.headers,
                  Authorization: `Bearer ${access_token}`,
              }
            : config.headers;

        const { data, status } = await api({ ...config, headers });

        if (status === 200) {
            return data;
        }
    } catch (e) {
        console.error('requestData', e);
    }
}

export const requestLogin = ({ password, username }: LoginData) => {
    const headers = {
        Authorization: `Basic ${window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    const data = qs.stringify({
        password,
        username,
        grant_type: 'password',
    });

    return axios({
        method: 'POST',
        baseURL: BASE_URL,
        url: '/oauth/token',
        data,
        headers,
    });
};

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            history.push(ADMIN_AUTH);
        }

        return Promise.reject(error);
    }
);

export const isAuthenticated = (): boolean => {
    const tokenData = getTokenData();
    return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

export const hasAnyRoles = (roles: Role[]): boolean => {
    if (roles.length === 0) return true;

    const tokenData = getTokenData();

    if (tokenData !== undefined) {
        return roles.some((role) => tokenData.authorities.includes(role));
    }

    return false;
};
