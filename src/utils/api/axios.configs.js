import axios from 'axios';
import { deleteToken } from 'src/utils/helpers/localStorage';
import swal from 'sweetalert';

export const BASE_API_URL = process.env.NEXT_PUBLIC_DOMAIN_API || 'http://localhost:6880'

export const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { response: { status } } = error;
    // if (status === 401) {
    //   deleteToken();
    //   window.location.href = "/signin";
    // }
    // if (status === 403) {
    //   window.location.href = "/403";
    // }
    return Promise.reject(error);
  }
);

api.defaults.headers.common['Authorization'] = typeof window !== 'undefined' && localStorage.getItem('USER_TOKEN') != null ? `Bearer ${localStorage.getItem('USER_TOKEN')}` : null;

export function setAuthorization(token) {
  api.defaults.headers.common['Authorization'] = token === null ? token : `Bearer ${token}`
}

export function removeAuthorization() { //for Logout
  setAuthorization(null)
}