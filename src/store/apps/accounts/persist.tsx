import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import accountReducer from "src/store/apps/accounts";


const persistConfig = {
    key: "account",
    storage,
    whitelist: ["selectedId"] 
};

const persistedAccountReducer = persistReducer(persistConfig, accountReducer);

export default persistedAccountReducer;
