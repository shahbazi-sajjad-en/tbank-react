import httpservice from "src/configs/httpservice";
import { ExportExcelResponse, ExportExcelType } from "./types";

export const ExportExcel = (
  payload: ExportExcelType
): Promise<ExportExcelResponse> => {
  return httpservice
    .post("/media/card-list/export/base64", payload)
    .then((res) => res.data)
    .catch((err) => {
      console.error("GetAccountCards error:", err);
      throw err;
    });
};
