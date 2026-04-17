import type { Follow } from ".";

export interface CreateThreadRes {
  id: string;
  image: string;
  content: string;
  userId: string;
}

export interface ThreadsByUserIdRes extends User {
  threads: Post[];
  isFollowing: boolean;
}

export interface UsersPage {
  data: Follow[];
  nextCursor: string | null;
}
