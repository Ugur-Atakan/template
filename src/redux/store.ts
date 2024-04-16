import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import commonReducer from "./reducers/commonReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    common: commonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
