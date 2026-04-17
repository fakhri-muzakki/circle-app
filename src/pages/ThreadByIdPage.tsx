import PostItem from "@/features/post/PostItem";
import ReplyCard from "@/features/reply/components/ReplyCard";
import CommentForm from "@/features/thread/components/CommentForm";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { useSocket } from "@/shared/hooks/useSocket";
import { setThreads } from "@/shared/slices/threadSlice";
import type {
  DetailThreadRes,
  // Post,
  Reply,
  // ThreadDetail,
} from "@/shared/types";
import fetchData from "@/shared/utils/fetch";
import { useEffect, useState } from "react";

import { useParams } from "react-router";

// type Thread = Omit<DetailThreadRes, "replies">;

const ThreadByIdPage = () => {
  const { threadid } = useParams();
  const dispatch = useAppDispatch();

  const socket = useSocket();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const [replies, setReplies] = useState<Reply[]>([]);
  const threads = useAppSelector((state) => state.threads.threads);
  const post = threads.find((thread) => thread.id === threadid);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const result = await fetchData<DetailThreadRes>({
        url: `${import.meta.env.VITE_API_URL}/api/threads/${threadid}`,
        options: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      if (!result) {
        throw new Error("Some thing went wrong");
      }

      dispatch(setThreads([result.data]));
      setReplies(result.data.replies ?? []);
    };

    getData();
  }, [token, threadid, dispatch]);

  useEffect(() => {
    const handleNewTask = (data: Reply) => {
      setReplies((prev) => [data, ...prev]);
    };

    socket.on("reply:created", handleNewTask);

    return () => {
      socket.off("reply:created", handleNewTask);
    };
  }, [socket, user]);

  return post ? (
    <>
      <PostItem post={post} />
      <CommentForm threadId={post.id} />
      {replies.map((reply) => (
        <ReplyCard
          key={reply.id}
          id={reply.id}
          avatar={reply.avatar}
          content={reply.content}
          name={reply.name}
          image={reply.image}
          username={reply.username}
        />
      ))}
    </>
  ) : (
    <>Not found</>
  );
};

export default ThreadByIdPage;
