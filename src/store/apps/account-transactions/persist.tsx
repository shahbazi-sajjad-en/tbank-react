import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import accountTransactionsReducer from "src/store/apps/account-transactions"

const persistConfig = {
  key: "accountTransactions",
  storage,
  whitelist: ["selectedId"], // فقط selectedId ذخیره شود
}

const persistedAccountReducer = persistReducer(persistConfig, accountTransactionsReducer)

export default persistedAccountReducer
