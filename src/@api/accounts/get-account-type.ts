import httpservice from "src/configs/httpservice";

export const GetAccountTypeList = (): Promise<any> => {
  return httpservice
    .get("/financial/financial-product-list")
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
