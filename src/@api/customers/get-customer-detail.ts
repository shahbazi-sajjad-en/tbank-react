import httpservice from "src/configs/httpservice";
import { CustomerRequest, CustomerResponse } from "./types";

export const GetCustomerDetails = (
  payload: CustomerRequest
): Promise<CustomerResponse> => {
  return httpservice
    .post("/userCustomer/detail", payload)
    .then((res) => res.data)
    .catch((err) => {
      console.error("GetAccountCards error:", err);
      throw err;
    });
};
