import PostItem from "@/features/post/PostItem";
import { useAppSelector } from "@/shared/hooks/redux";

const ProfilePosts = () => {
  const threads = useAppSelector((state) => state.threads.threads);
  return (
    <div>
      {threads.map((thread) => (
        <PostItem key={thread.id} post={thread} />
      ))}
    </div>
  );
};

export default ProfilePosts;
