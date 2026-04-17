import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import type { Follow } from "@/shared/types";
import FollowButton from "./FollowButton";
import { Link } from "react-router";
// import { Link } from "lucide-react";

interface FollowItemProps extends Follow {
  toggleFollow: (followerId: string, isFollowing: boolean) => Promise<void>;
}

const FollowItem = ({
  id,
  username,
  name,
  avatar,
  isFollowing,
  toggleFollow,
}: FollowItemProps) => {
  return (
    <div className="flex justify-between items-center">
      {/* Left */}
      <div className="flex gap-3">
        {/* avatar */}
        <Link to={`/${username}`}>
          <Avatar size="lg">
            <AvatarImage src={avatar} />
            <AvatarFallback>{name?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>

        {/* content */}

        <Link to={`/${username}`}>
          <span className="font-semibold block">{name}</span>
          <span className="text-muted-foreground">@{username}</span>
        </Link>
      </div>

      {/* Right */}
      <FollowButton
        id={id}
        isFollowing={isFollowing}
        toggleFollow={toggleFollow}
      />
    </div>
  );
};

export default FollowItem;
