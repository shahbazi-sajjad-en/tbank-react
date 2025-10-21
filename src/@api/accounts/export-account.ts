import httpservice from "src/configs/httpservice";

export const ExportExell = (data: any): Promise<any> => {
  return httpservice
    .post("/financial/account/export", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
