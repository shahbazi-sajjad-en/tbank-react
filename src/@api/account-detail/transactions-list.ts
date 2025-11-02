import httpservice from "src/configs/httpservice";

interface DataType {
  accountNumber: string;
  block: boolean;
  description: string;
}

export const TransActionsList = (data: DataType) => {
  return httpservice
    .post("transaction/", data)
    .then((res) => res.data)
    .catch((err) => err);
};
