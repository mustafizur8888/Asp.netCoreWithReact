import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { history } from '../..';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(undefined, (error) => {
  if (error.response.status == 404) {
    history.push('/notfound');
  }
});

const resposeBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const request = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(resposeBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(resposeBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(resposeBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(resposeBody),
};

const Activities = {
  list: (): Promise<IActivity[]> => request.get('/activities'),
  details: (id: string) => request.get(`/activities/${id}`),
  create: (activity: IActivity) => request.post('/activities', activity),
  update: (activity: IActivity) =>
    request.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.del(`/activities/${id}`),
};

export default {
  Activities,
};
