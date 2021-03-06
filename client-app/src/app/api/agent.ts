import { IProfile, IPhoto, IUpdateProfile } from './../models/profile';
import { IUser, IUserFormValues } from './../models/user';
import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { history } from '../..';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(undefined, (error: any) => {
  if (error.message === 'Network Error' && !error.response) {
    toast.error('Network error - make sure API is running!');
  }
  const { status, config, data } = error.response;
  if (status === 404) {
    history.push('/notfound');
  } else if (
    status === 400 &&
    config.method === 'get' &&
    data.errors.hasOwnProperty('id')
  ) {
    history.push('/notfound');
  } else if (status === 500) {
    toast.error('Server error -check ther terminal for more info!');
  }
  throw error.response;
});

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios
      .post(url, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(resposeBody);
  },
};

const Activities = {
  list: (): Promise<IActivity[]> => request.get('/activities'),
  details: (id: string) => request.get(`/activities/${id}`),
  create: (activity: IActivity) => request.post('/activities', activity),
  update: (activity: IActivity) =>
    request.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.del(`/activities/${id}`),
  attend: (id: string) => request.post(`/activities/${id}/attend`, {}),
  unattend: (id: string) => request.del(`/activities/${id}/attend`),
};

const User = {
  current: (): Promise<IUser> => request.get('/user'),
  login: (user: IUserFormValues): Promise<IUser> =>
    request.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    request.post(`/user/register`, user),
};

const Profile = {
  get: (username: string): Promise<IProfile> =>
    request.get(`/profiles/${username}`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> =>
    request.postForm(`/photos`, photo),
  setMainPhoto: (id: string) => request.post(`/photos/${id}/setMain`, {}),
  delete: (id: string) => request.del(`/photos/${id}`),
  updateProfile: (profile: IUpdateProfile): Promise<IUpdateProfile> =>
    request.put(`/profiles`, profile),
};

export default {
  Activities,
  User,
  Profile,
};
