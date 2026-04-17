import FollowItem from "@/features/follow/FollowItem";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { useUsers } from "@/shared/hooks/useUsers";
import { updateFollowerCount } from "@/shared/slices/authSlice";
import fetchData from "@/shared/utils/fetch";
import { ChevronLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router";

const SuggestionPage = () => {
  // const [users, setUsers] = useState<User[]>([]);
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  if (!token) throw new Error("Token is not found");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useUsers();

  // console.log(data);

  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Kalau sentinel terlihat di viewport DAN masih ada data berikutnya
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users.</div>;

  // flatMap untuk flatten semua pages menjadi satu array
  const users = data?.pages.flatMap((page) => page.data);

  const toggleFollow = async (
    followerId: string,
    isFollowing: boolean,
  ): Promise<void> => {
    if (isFollowing) {
      await fetchData({
        url: `${import.meta.env.VITE_API_URL}/api/follows/${followerId}`,
        options: {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      dispatch(updateFollowerCount("decrement"));
    } else {
      await fetchData({
        url: `${import.meta.env.VITE_API_URL}/api/follows`,
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            followerId: user?.id,
            followingId: followerId,
          }),
        },
      });

      dispatch(updateFollowerCount("increment"));
    }

    // setUsers((prev) =>
    //   prev.map((p) =>
    //     p.id === followerId ? { ...p, isFollowing: !isFollowing } : p,
    //   ),
    // );
  };

  return (
    <>
      <div className="p-6 border-b sticky top-0 z-50 bg-background flex items-center gap-2">
        <Link to={"/"}>
          <ChevronLeft />
        </Link>
        <h2 className="text-lg font-semibold">Suggestions</h2>
      </div>

      <div className="p-6 space-y-4">
        {users?.map(({ id, avatar, name, username, isFollowing }) => (
          <FollowItem
            key={id}
            id={id}
            avatar={avatar}
            name={name}
            username={username}
            isFollowing={isFollowing}
            toggleFollow={toggleFollow}
          />
        ))}
      </div>

      {/* Sentinel — elemen ini yang "diintip" observer */}
      <div ref={sentinelRef} style={{ height: 1 }} />

      {isFetchingNextPage && <div>Loading more...</div>}
      {/* {!hasNextPage && <div>No more users.</div>} */}
    </>
  );
};

export default SuggestionPage;
