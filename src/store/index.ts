import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

// Reducers
import user from "src/store/apps/user";
import chat from "src/store/apps/chat";
import email from "src/store/apps/email";
import invoice from "src/store/apps/invoice";
import calendar from "src/store/apps/calendar";
import permissions from "src/store/apps/permissions";
import persistedAccountReducer from "./apps/accounts/persist";
import userReducer from "./apps/profile";

export const store = configureStore({
  reducer: {
    // user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    userReducer,
    account: persistedAccountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
