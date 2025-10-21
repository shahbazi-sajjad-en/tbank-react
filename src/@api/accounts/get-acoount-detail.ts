import httpservice from "src/configs/httpservice";

export const GetAccountDetail = (accountNumber: string): Promise<any> => {
  return httpservice
    .post("/financial/account-detail", accountNumber)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};


