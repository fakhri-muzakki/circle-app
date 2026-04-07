import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./shared/slices/authSlice";
import threadReducer from "./shared/slices/threadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
