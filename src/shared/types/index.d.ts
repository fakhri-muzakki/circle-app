export interface APIResponse<T> {
  success: boolean;
  message: string;
  nextCursor?: string;
  data: T;
}

export interface LoginRes {
  id: string;
  name: string;
  email: string;
  avatar: string;
  password: string;
  username: string;
  accessToken: string;
  bio: string;
  followers: number;
  following: number;
}

export interface RegisterRes {
  id: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
}

type Post = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  image?: string;
  comments: number;
  isLiked: boolean;
};

export interface Reply {
  id: string;
  avatar: string;
  image?: string;
  username: string;
  name: string;
  content: string;
}

export interface DetailThreadRes {
  id: string;
  image?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: null;
  userId: string;
  // user: User;
  isLiked: boolean;
  likes: number;
  comments: number;
  replies?: Reply[];
  threadId?: string;
  time: string;
  avatar: string;
  name: string;
  username: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  password: string;
  username: string;
  bio: string;
  followers: string;
  following: string;
}

export type ThreadDetail = Omit<DetailThreadRes, "replies">;

export interface Follow {
  id: string;
  username: string;
  name: string;
  avatar: string;
  isFollowing: boolean;
}
