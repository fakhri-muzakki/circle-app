import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  email: string;
  password: string;
};

interface LoginData {
  token: string;
  user: User;
}

type AuthState = {
  user: User | null;
  token: string | null;
};

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken ? storedToken : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginData>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Simpan ke localstorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
