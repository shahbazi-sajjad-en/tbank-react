// src/configs/httpservice.ts
import axios from "axios";

const httpservice = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
});

httpservice.interceptors.request.use(async (config) => {
  config.headers = {
    ...config.headers,
  };
  return config;
});

httpservice.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status === 403 ) {
      try {
        await axios.post(
          "/api/v1/tbank/security/auth/logout",
          {},
          { withCredentials: true }
        );
      } catch (logoutError) {
        console.warn("Logout API failed:", logoutError);
      }
      if (typeof window !== "undefined") {
        window.location.replace("/login");
      }
      // هدایت به صفحه ورود
      // await signOut({ callbackUrl: "/login" });
    }

    return Promise.reject(error);
  }
);

export default httpservice;
