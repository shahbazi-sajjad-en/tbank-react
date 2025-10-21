import httpservice from "src/configs/httpservice";

interface DataType {
  accountNumber: string;
  amount: string;
  description: string;
}

export const UnBlockBalance = (data: DataType): Promise<any> => {
  return httpservice
    .post("/financial/unblock-balance", data)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};
