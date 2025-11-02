import httpservice from "src/configs/httpservice";

interface DataType {
  accountNumber: string;
  amount: string;
  description: string;
}

export const BlockBalance = (data: DataType): Promise<any> => {
  return httpservice.post("/financial/block-balance", data).then((res) => {
    return res;
  });
};
