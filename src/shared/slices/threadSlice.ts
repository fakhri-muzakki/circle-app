import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../types";
// import fetchData from "../utils/fetch";

type Threads = {
  threads: Post[];
};

const initialState: Threads = {
  threads: [],
};

interface AddThread {
  id: string;
  content: string;
  image: string;
  name: string; //  nanti ganti jadi fullname
  username: string;
  avatar: string;
}

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

      //   await fetchData({url: "${import.meta.env.VITE_API_URL}/api/likes", options:{
      //     headers: {
      //         "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify(threadId)
      //   }})
    },
    setThreads: (state, action: PayloadAction<Post[]>) => {
      state.threads = action.payload;
    },

    addThread: (state, action: PayloadAction<AddThread>) => {
      const { id, image, content, name, username, avatar } = action.payload;

      const thread: Post = {
        id,
        name,
        image,
        content,
        likes: 0,
        username,
        avatar,
        comments: 0,
        isLiked: false,
        time: "a few seconds ago",
      };

      state.threads = [thread, ...state.threads];
    },

    addTotalComments: (state, action: PayloadAction<{ threadId: string }>) => {
      const { threadId } = action.payload;
      state.threads = state.threads.map((thread) =>
        thread.id === threadId
          ? { ...thread, comments: thread.comments + 1 }
          : thread,
      );
    },
  },
});

export const { toggleLike, setThreads, addThread, addTotalComments } =
  threadSlice.actions;
export default threadSlice.reducer;
