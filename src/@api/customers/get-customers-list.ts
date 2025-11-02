import httpservice from "src/configs/httpservice";
import { CustomerDetailRequest, CustomerResponse } from "./types";

export const GetCustomersList = (
  payload: CustomerDetailRequest
): Promise<CustomerResponse> => {
  return httpservice
    .post("/userCustomer/paged", payload)
    .then((res) => res.data)
    .catch((err) => {
      console.error("GetAccountCards error:", err);
      throw err;
    });
};
