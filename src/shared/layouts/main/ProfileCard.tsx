import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";

const ProfileCard = () => {
  return (
    <Card className="p-4">
      <div className="h-20 rounded-xl bg-linear-to-r from-green-300 via-yellow-300 to-orange-300 relative">
        <div className="absolute -bottom-6 left-4">
          <Avatar className="w-14 h-14 border-2 border-background">
            <AvatarImage src="https://i.pravatar.cc/100" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">✨ Stella Audhina ✨</h3>
            <p className="text-sm text-muted-foreground">@username</p>
          </div>

          <Button variant="outline" size="sm" className="rounded-full">
            Edit Profile
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-3">
          picked over by the worms, and weird fishes
        </p>

        <p className="text-xs text-muted-foreground mt-3">
          <span className="font-medium text-foreground">291</span> Following ·{" "}
          <span className="font-medium text-foreground">23</span> Followers
        </p>
      </div>
    </Card>
  );
};

export default ProfileCard;
