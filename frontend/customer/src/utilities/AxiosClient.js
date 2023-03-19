import axios from "axios";
import { stringify } from "qs";

const BASE_URL = "http://localhost:8000";

const AxiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    serialize: stringify,
  },
});

AxiosClient.interceptors.response.use(
  // status code 200 - 201
  (response) => {
    if (response?.status) return response.data;
    return response;
  },
  // other status code
  (err) => {
    return Promise.reject(err.response.data);
  }
);

export default AxiosClient;
