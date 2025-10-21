import httpservice from "src/configs/httpservice";

export const GetStatusList = (): Promise<any> => {
  return httpservice
    .get("/financial/account-status-type-list")
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};
