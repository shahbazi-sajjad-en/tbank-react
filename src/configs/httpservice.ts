// src/configs/httpservice.ts
import axios from "axios";
import { getSession } from "next-auth/react";

const httpservice = axios.create({
  baseURL: "baseurl::/api/v1/tbank",
  timeout: 10000,
});

httpservice.interceptors.request.use(async (config) => {
  const session = await getSession(); // session جاری
  if (session?.user?.token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${session.user.token}`,
    };
  }
  return config;
});

export default httpservice;
