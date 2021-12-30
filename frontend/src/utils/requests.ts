import axios, { AxiosRequestConfig } from 'axios';

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
});

export const requestData = async ({
  ...rest
}: AxiosRequestConfig): Promise<any> => {
  try {
    const { data, status } = await api(rest);

    if (status === 200) {
      return data;
    } else {
      console.error('Erro na requizição!');
    }
  } catch (e) {
    console.error(e);
  }
};
