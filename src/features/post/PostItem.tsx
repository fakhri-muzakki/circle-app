import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { toggleLike } from "@/shared/slices/threadSlice";
import type { Post } from "@/shared/types";
import { Heart, MessageCircleMore } from "lucide-react";
import { toggleLikeService } from "../thread/thread.service";

const PostItem = ({ post }: { post: Post }) => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  if (!token) {
    throw new Error("Token is not found");
  }

  const handleClick = async () => {
    dispatch(toggleLike({ threadId: post.id }));
    await toggleLikeService(post.id, token);
  };

  return (
    <div className="p-6 flex gap-4 hover:bg-white/2 transition">
      <img src={post.avatar} className="w-10 h-10 rounded-full" />

      <div className="flex-1">
        {/* HEADER */}
        <div className="flex items-center gap-2 text-sm ">
          <span className="font-semibold">{post.name}</span>
          <span className="text-white/40">@{post.username}</span>
          <span className="text-white/40">· {post.time}</span>
        </div>

        {/* CONTENT */}
        <p className="text-sm mt-1 text-white/90">{post.content}</p>

        {/* IMAGE (optional) */}
        {post.image && (
          <img
            src={post.image}
            className="mt-3 rounded-xl border border-white/10"
          />
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
