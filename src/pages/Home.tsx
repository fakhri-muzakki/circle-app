import { Image as ImageIcon } from "lucide-react";
import PostItem from "@/features/post/PostItem";
import type { Post } from "@/shared/types";

import { Button } from "@/shared/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import { Textarea } from "@/shared/components/ui/textarea";
import { Separator } from "@/shared/components/ui/separator";
import { useEffect } from "react";
import fetchData from "@/shared/utils/fetch";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { setThreads } from "@/shared/slices/threadSlice";
// import { useAppSelector } from "@/shared/hooks/redux";

export default function HomePage() {
  const token = useAppSelector((state) => state.auth.token);
  const threads = useAppSelector((state) => state.threads.threads);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialData = async (): Promise<void> => {
      const result = await fetchData({
        url: "http://localhost:3000/api/threads",
        options: { headers: { Authorization: `Bearer ${token}` } },
      });

      const data = result.data as Post[];
      dispatch(setThreads(data));
    };

    initialData();
  }, [token, dispatch]);

  return (
    <>
      <div className="p-6 border-b sticky top-0 z-50 bg-background">
        <h2 className="text-lg font-semibold">Home</h2>
      </div>

      <div>
        {/* COMPOSER */}
        <div className="p-6 flex gap-4">
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Textarea
              placeholder="What is happening?!"
              className="border-none focus-visible:ring-0 resize-none"
            />

            <div className="flex justify-between items-center mt-3">
              <Button variant="ghost" size="icon">
                <ImageIcon size={18} />
              </Button>

              <Button className="rounded-full">Post</Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* FEED */}
        {threads.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
