import axios from "axios";

export const LogOut = (): Promise<any> => {
  return axios
    .post(
      "/api/security/auth/logout"
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
