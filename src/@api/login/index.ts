import axios from "axios";

export const Login = (data: any): Promise<any> => {
  return axios
    .post("baseurl::/api/v1/tbank/security/auth/login", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
