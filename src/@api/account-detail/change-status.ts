import httpservice from "src/configs/httpservice";

interface DataType {
  accountNumber: string;
  block: boolean;
  description: string;
}

export const ChangeAccountStatus = (data: DataType) => {
  return httpservice
    .post("/financial/change-account-status", data)
    .then((res) => res.data);
};
