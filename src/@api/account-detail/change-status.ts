import httpservice from "src/configs/httpservice";

interface DataType {
  accountNumber: string;
  block: boolean;
  description: string;
}

export const ChangeAccountStatus = async (data: DataType) => {
  try {
    const res = await httpservice.post(
      "/financial/change-account-status",
      data
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};
