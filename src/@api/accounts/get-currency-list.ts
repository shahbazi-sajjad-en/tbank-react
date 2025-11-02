import httpservice from "src/configs/httpservice";

export const GetCurrencyList = (): Promise<any> => {
  return httpservice
    .get("/financial/currency-list")
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
