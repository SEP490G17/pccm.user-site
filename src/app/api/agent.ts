import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from '../router/Routes';
import { store } from '../stores/store';
import { toast } from 'react-toastify';
import { sleep } from '../helper/utils';
import { Banner } from '../models/banner.model';
import { ICourtCluster } from '../models/courtcluster.model';
import { INews } from '../models/news.model';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(500);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    console.group('check axios');

    switch (status) {
      case 400:
        if (config.method === 'get' && data.errors.hasOwnProperty.call(data.errors, 'id')) {
          router.navigate('/not-found');
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          console.log(modalStateErrors);
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error('unauthorized');
        break;
      case 403:
        toast.error('forbidden');
        break;
      case 404:
        console.log('error 404');
        router.navigate('/not-found');
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate('/server-error');
        break;
    }
    console.groupEnd();
    return Promise.reject(error);
  },
);
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Banners = {
  list: (): Promise<Banner[]> => requests.get(`/banner/usersite`),
};

const CourtClusters = {
  list: (): Promise<ICourtCluster[]> => requests.get(`/courtCluster/list-all-usersite`),
  details: (id: string): Promise<ICourtCluster> => requests.get(`/CourtCluster/usersite/${id}`),
};

const News = {
  list: (): Promise<INews[]> => requests.get(`/News/usersite`),
};

const agent = {
  requests,
  Banners,
  CourtClusters,
  News,
};

export default agent;
