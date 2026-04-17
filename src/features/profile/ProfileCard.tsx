import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import ProfileButton from "./ProfileButton";
import type { CurrentUser } from "@/pages/profile/ProfilePage";
import { Link } from "react-router";

interface ProfileCardProps {
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
}

const ProfileCard = ({ currentUser, setCurrentUser }: ProfileCardProps) => {
  return (
    <div className="p-4 bg-transparent ">
      <div className="h-20 rounded-xl bg-linear-to-r from-green-300 via-yellow-300 to-orange-300 relative mb-12">
        <div className="absolute -bottom-6 left-4">
          <Avatar className="w-14 h-14 border-2 border-background">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">✨ {currentUser.name} ✨</h3>
            <p className="text-sm text-muted-foreground">
              @{currentUser.username}
            </p>
          </div>

          <ProfileButton
            setCurrentUser={setCurrentUser}
            isFollowing={currentUser.isFollowing}
            currentUser={currentUser}
          />
        </div>

        <p className="text-sm text-muted-foreground mt-3">{currentUser.bio}</p>

        <p className="text-xs text-muted-foreground mt-3">
          <Link
            to={`/${currentUser.username}/following`}
            className="font-medium text-foreground"
          >
            {currentUser.following}{" "}
            <span className="text-muted-foreground">Following</span>
          </Link>{" "}
          ·{" "}
          <Link
            to={`/${currentUser.username}/followers`}
            className="font-medium text-foreground"
          >
            {currentUser.followers}{" "}
            <span className="text-muted-foreground">Followers</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
