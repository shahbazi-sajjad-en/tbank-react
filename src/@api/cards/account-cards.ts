import httpservice from "src/configs/httpservice"
import { AccountCardsRequest, AccountCardsResponse } from "./types"


export const GetAccountCards = (
  payload: AccountCardsRequest
): Promise<AccountCardsResponse> => {
  return httpservice
    .post("/media/card-list", payload)
    .then((res) => res.data)
    .catch((err) => {
      console.error("GetAccountCards error:", err)
      throw err
    })
}
