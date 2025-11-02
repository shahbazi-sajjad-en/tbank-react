import axios from "axios";

export const Login = (data: any): Promise<any> => {
  return axios
    .post(
      "http://webchanneldev4.ham-sun.com:10004/api/v1/tbank/security/auth/login",
      data,
      { withCredentials: true }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error("Login error:", err);
      throw err;
    });
};
