import ProfileCard from "@/features/profile/ProfileCard";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { setThreads } from "@/shared/slices/threadSlice";
import type { User } from "@/shared/types";
import type { ThreadsByUserIdRes } from "@/shared/types/apiResponse";
import fetchData from "@/shared/utils/fetch";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router";
import ProfileNotFound from "./ProfileNotfound";

export type CurrentUser = User & { isFollowing: boolean };

const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const [images, setImages] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const token = useAppSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);

  if (!username) {
    throw new Error("username is not found");
  }

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const result = await fetchData<ThreadsByUserIdRes>({
        url: `${import.meta.env.VITE_API_URL}/api/users/${username}/threads`,
        options: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      if (result.data) {
        const images = result.data.threads
          .filter((thread) => thread.image)
          .map((thread) => thread.image as string);

        setImages(images);
        setCurrentUser(result.data);
        dispatch(setThreads(result.data.threads));
      }

      setIsLoading(false);
    };

    getData();
  }, [dispatch, token, username]);

  if (!currentUser && !isLoading) {
    return <ProfileNotFound />;
  }

  return (
    <>
      <div className="p-6 border-b sticky top-0 z-50 bg-background flex items-center gap-2">
        <Link to={"/"}>
          <ChevronLeft />
        </Link>
        <h2 className="text-lg font-semibold">{username}</h2>
      </div>
      {currentUser && (
        <ProfileCard
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}

      <div className="grid grid-cols-2 text-center ">
        <NavLink
          to={`/${username}`}
          end
          className={({ isActive }) =>
            cn(
              `${isActive ? "border-primary" : "border-secondary"} border-b py-4 `,
            )
          }
        >
          All posts
        </NavLink>

        <NavLink
          to={`/${username}/media`}
          className={({ isActive }) =>
            cn(
              `${isActive ? "border-primary" : "border-secondary"} border-b py-4 `,
            )
          }
        >
          Media
        </NavLink>
      </div>
      <div className="">
        <Outlet context={{ images }} />
      </div>
    </>
  );
};

export default ProfilePage;
