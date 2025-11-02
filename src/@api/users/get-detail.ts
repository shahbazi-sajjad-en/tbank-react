import httpservice from "src/configs/httpservice";
import {
    UserDetailPayload,
    UserDetailResponse
} from "./types";

export const GetUserDetail = (
  payload: UserDetailPayload
): Promise<UserDetailResponse> => {
  return httpservice
    .post("/userAccount/detail", payload)
    .then((res) => res.data)
    .catch((err) => {
      console.error("GetAccountCards error:", err);
      throw err;
    });
};
