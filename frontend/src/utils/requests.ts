import axios from 'axios';
import { Product } from 'types/product';
import { AxiosParams } from 'types/vendor/axios';

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
});

export const getById = async (params: string): Promise<Product | undefined> => {
  try {
    const { data, status } = await api.get(params);

    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.error(e);
  }
};

export const getPage = async (url: string, page: number) => {
  try {
    const param: AxiosParams = {
      method: 'GET',
      url,
      params: {
        page: page,
        size: 12,
      },
    };

    const { data, status } = await api(param);

    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.error(e);
  }
};
