export interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginRes {
  id: string;
  email: string;
  password: string;
  accessToken: string;
}

export interface RegisterRes {
  id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
}

type Post = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
};

// export interface Thread {
//   id: number;
//   content: string;
//   userId: string,
//   user:{
//     username: string;
//     fullname: string;
//     photoProfile: string;

//   },
//   time: string;
//   image?: string; // image postingan
//   _count: {
//     likes: number;
//     comments: number;
//   };
// }
