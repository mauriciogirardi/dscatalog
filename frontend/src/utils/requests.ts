import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { LoginData } from 'types/login';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog-client';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog-secret';

export const api = axios.create({
  baseURL: BASE_URL,
});

async function requestData<T>({
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
    console.error(e);
  }
}

function requestLogin({ password, username }: LoginData) {
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
}

export { requestData, requestLogin };
