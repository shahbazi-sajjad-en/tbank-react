import httpservice from "src/configs/httpservice";

export const GetUserProfile = async (): Promise<any> => {
  try {
    const res = await httpservice.get("/userAccount/current-user");
    return res.data;
  } catch (err: any) {
    if (err.response) {
      throw err.response.data;
    }
    throw err;
  }
};
