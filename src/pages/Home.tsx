import PostItem from "@/features/post/PostItem";
import type { Post } from "@/shared/types";
import { Separator } from "@/shared/components/ui/separator";
import { useEffect } from "react";
import fetchData from "@/shared/utils/fetch";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { addThread, setThreads } from "@/shared/slices/threadSlice";
import CreateThreadForm from "@/features/home/CreateThreadForm";
import { useSocket } from "@/shared/hooks/useSocket";
import type { CreateThreadRes } from "@/shared/types/apiResponse";

export default function HomePage() {
  const socket = useSocket();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const threads = useAppSelector((state) => state.threads.threads);

  if (!user) {
    throw new Error("Token invalid");
  }

  console.log(user);

  useEffect(() => {
    const initialData = async (): Promise<void> => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const result = await fetchData({
        url: `${apiUrl}/api/threads`,
        options: { headers: { Authorization: `Bearer ${token}` } },
      });

      const data = result.data as Post[];
      dispatch(setThreads(data));
    };

    initialData();
  }, [token, dispatch]);

  useEffect(() => {
    const handleNewTask = ({ id, content, image }: CreateThreadRes) => {
      // Ganti pake auth.user abis benerin login
      const { name, username, avatar } = user;
      dispatch(addThread({ id, content, image, name, username, avatar }));
      console.log(
        "signal dari socket worker =====================================",
      );
    };

    socket.on("thread:created", handleNewTask);

    return () => {
      socket.off("thread:created", handleNewTask);
    };
  }, [socket, dispatch, user]);

  return (
    <>
      <div className="p-6 border-b sticky top-0 z-50 bg-background">
        <h2 className="text-lg font-semibold">Home</h2>
      </div>

      <div>
        <CreateThreadForm />

        <Separator />

        {/* FEED */}
        {threads.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
