import { Button } from "@/shared/components/ui/button";

const FollowButton = ({
  id,
  isFollowing,
  toggleFollow,
}: {
  id: string;
  isFollowing: boolean;
  toggleFollow: (followerId: string, isFollowing: boolean) => Promise<void>;
}) => {
  return (
    <Button
      variant={"outline"}
      size={"lg"}
      className="px-4"
      onClick={() => toggleFollow(id, isFollowing)}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
