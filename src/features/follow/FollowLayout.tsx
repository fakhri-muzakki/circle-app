import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { updateFollowerCount } from "@/shared/slices/authSlice";
import fetchData from "@/shared/utils/fetch";
import { NavLink, Outlet, useParams } from "react-router";

export type ToggleFollow = (
  followerId: string,
  isFollowing: boolean,
  callback: (followerId: string) => void,
) => Promise<void>;

const FollowLayout = () => {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);

  const toggleFollow = async (
    followerId: string,
    isFollowing: boolean,
    callback: (followerId: string) => void,
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
          method: "POST", // ✅ di luar headers
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

    callback(followerId);
  };

  return (
    <>
      <div className="p-6 border-b sticky top-0 z-50 bg-background">
        <h2 className="text-lg font-semibold">Follows</h2>
      </div>
      <div className="grid grid-cols-2 text-center ">
        <NavLink
          to={`/${username}/followers`}
          end
          className={({ isActive }) =>
            cn(
              `${isActive ? "border-primary" : "border-secondary"} border-b py-4 `,
            )
          }
        >
          Followers
        </NavLink>

        <NavLink
          to={`/${username}/following`}
          className={({ isActive }) =>
            cn(
              `${isActive ? "border-primary" : "border-secondary"} border-b py-4 `,
            )
          }
        >
          Following
        </NavLink>
      </div>
      <div className="">
        <Outlet context={{ toggleFollow }} />
      </div>
    </>
  );
};

export default FollowLayout;
