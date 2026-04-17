import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { toggleLike } from "@/shared/slices/threadSlice";
import type { Post } from "@/shared/types";
import { Heart, MessageCircleMore } from "lucide-react";
import { toggleLikeService } from "../thread/thread.service";
import { Link } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

const PostItem = ({ post }: { post: Post }) => {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  if (!token || !user) {
    throw new Error("Token is not found");
  }

  const handleClick = async () => {
    dispatch(toggleLike({ threadId: post.id }));
    await toggleLikeService(post.id, token);
  };

  return (
    <div className="p-6 flex gap-4 hover:bg-white/2 transition">
      <Link to={`/${post.username}`}>
        {/* <img src={post.avatar} className="w-10 h-10 rounded-full" /> */}
        <Avatar>
          <AvatarImage src={post.avatar} />
          <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex-1">
        {/* HEADER */}
        <div className="flex items-center gap-2 text-sm ">
          <Link to={`/${post.username}`}>
            <span className="font-semibold mr-2">{post.name}</span>
            <span className="text-white/40">@{post.username}</span>
          </Link>
          <span className="text-white/40">· {post.time}</span>
        </div>

        {/* CONTENT */}
        <Link to={`/${user.username}/posts/${post.id}`}>
          <p className="text-sm mt-1 text-white/90">{post.content}</p>
        </Link>

        {/* IMAGE (optional) */}

        {post.image && (
          <Link to={`/${user.username}/posts/${post.id}`}>
            <img
              src={post.image}
              className="mt-3 rounded-xl border border-white/10"
            />
          </Link>
        )}

        {/* ACTIONS */}
        <div className="flex gap-6 mt-4 text-white/50 text-sm">
          <button className="hover:text-white flex items-center gap-1">
            <MessageCircleMore size={16} /> {post.comments}
          </button>
          <button
            className="hover:text-red-500 flex items-center gap-1"
            onClick={handleClick}
          >
            <Heart size={16} fill={post.isLiked ? "red" : undefined} />{" "}
            {post.likes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
