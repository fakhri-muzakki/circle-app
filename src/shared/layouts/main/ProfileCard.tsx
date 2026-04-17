import { Card } from "@/shared/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import { useAppSelector } from "@/shared/hooks/redux";
import EditProfile from "./EditProfile";

const ProfileCard = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    throw new Error("Token is not found");
  }

  return (
    <Card className="p-4">
      <div className="h-20 rounded-xl bg-linear-to-r from-green-300 via-yellow-300 to-orange-300 relative">
        <div className="absolute -bottom-6 left-4">
          <Avatar className="w-14 h-14 border-2 border-background">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">✨ {user.name} ✨</h3>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>

          <EditProfile />
        </div>

        <p className="text-sm text-muted-foreground mt-3">{user.bio}</p>

        <p className="text-xs text-muted-foreground mt-3">
          <span className="font-medium text-foreground">{user.following}</span>{" "}
          Following ·{" "}
          <span className="font-medium text-foreground">{user.followers}</span>{" "}
          Followers
        </p>
      </div>
    </Card>
  );
};

export default ProfileCard;
