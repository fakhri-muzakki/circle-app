import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../types";
// import fetchData from "../utils/fetch";

type Threads = {
  threads: Post[];
};

const initialState: Threads = {
  threads: [],
};

const threadSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    // login: (state, action: PayloadAction<LoginData>) => {
    //   state.user = action.payload.user;
    //   state.token = action.payload.token;

    //   // Simpan ke localstorage
    //   localStorage.setItem("token", action.payload.token);
    //   localStorage.setItem("user", JSON.stringify(action.payload.user));
    // },
    // logout: (state) => {
    //   state.user = null;
    //   state.token = null;
    //   localStorage.removeItem("user");
    //   localStorage.removeItem("token");
    // },
    toggleLike: (state, action: PayloadAction<{ threadId: string }>) => {
      const threadId = action.payload.threadId;
      state.threads = state.threads.map((thread) => {
        const number = thread.isLiked ? -1 : 1;
        const result =
          thread.id === threadId
            ? {
                ...thread,
                isLiked: !thread.isLiked,
                likes: thread.likes + number,
              }
            : thread;

        return result;
      });

      //   await fetchData({url: "http://localhost:3000/api/likes", options:{
      //     headers: {
      //         "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify(threadId)
      //   }})
    },
    setThreads: (state, action: PayloadAction<Post[]>) => {
      state.threads = action.payload;
    },
  },
});

export const { toggleLike, setThreads } = threadSlice.actions;
export default threadSlice.reducer;
