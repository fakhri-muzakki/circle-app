import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  password: string;
  username: string;
  bio: string;
  followers: number;
  following: number;
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
    // Untuk edit user profile
    editUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem(
          "user",
          JSON.stringify({ ...state.user, ...action.payload }),
        );
      }
    },

    updateFollowerCount: (
      state,
      action: PayloadAction<"increment" | "decrement">,
    ) => {
      if (state.user) {
        const user = state.user;
        let editUser: User;
        if (action.payload === "increment") {
          editUser = { ...user, followers: user.followers + 1 };
        } else {
          editUser = { ...user, followers: user.followers - 1 };
        }

        state.user = editUser;
        localStorage.setItem("user", JSON.stringify(editUser));
      }
    },
  },
});

export const { login, logout, editUserProfile, updateFollowerCount } =
  authSlice.actions;
export default authSlice.reducer;
