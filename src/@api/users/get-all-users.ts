import httpservice from "src/configs/httpservice";
import { UsersPayload, UsersResponse } from "./types";

export const GetUsersList = (
  payload: UsersPayload
): Promise<UsersResponse> => {
  return httpservice
    .post("/userAccount/users/paged", payload)
    .then((res) => res.data)
    .catch((err) => {
      console.error("GetAccountCards error:", err);
      throw err;
    });
};
