import { getSession, signOut } from "next-auth/react";
import axios, { AxiosInstance, AxiosError } from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: 3000,
});

axiosInstance.interceptors.request.use(async config => {
  const session = await getSession();

  if (session?.user?.token) {
    config.headers.Authorization = `Bearer ${session.user?.token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await signOut();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
