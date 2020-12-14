import axios from "axios";
import {API_BASE_URL, ACCESS_TOKEN_NAME} from './constants/apiContants';

//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem(ACCESS_TOKEN_NAME)) {
      //config.headers["x-auth-token"] = localStorage.getItem(ACCESS_TOKEN_NAME);
      config.headers.Authorization = "Bearer "+localStorage.getItem(ACCESS_TOKEN_NAME);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response) => {
    console.log("Masuk response");
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem(ACCESS_TOKEN_NAME);
    console.log(error.response.status);
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`${API_BASE_URL}/auth/refresh_token`, { refreshToken: refreshToken })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem(ACCESS_TOKEN_NAME, res.data.token);
            console.log("Access token refreshed!");
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

//functions to make api calls

const api = {
  signup: (body) => {
    return axios.post(`${API_BASE_URL}/auth/signup`, body);
  },
  login: (body) => {
    return axios.post(`${API_BASE_URL}/user/login`, body);
  },
  refreshToken: (body) => {
    return axios.post(`${API_BASE_URL}/auth/refresh_token`, body);
  },
  logout: (body) => {
    return axios.delete(`${API_BASE_URL}/auth/logout`, body);
  },
  getHotelProfile: () => {
    return axios.get(API_BASE_URL+'/hotel/profile');
  },
};

export default api;