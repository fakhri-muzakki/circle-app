import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";

const users = [
  {
    id: 1,
    name: "Mohammed Jawahir",
    username: "mjawahir",
    avatar: "https://i.pravatar.cc/101",
  },
  {
    id: 2,
    name: "Shakila Mith",
    username: "sakila",
    avatar: "https://i.pravatar.cc/102",
  },
  {
    id: 3,
    name: "Naveen Singh",
    username: "naveen",
    avatar: "https://i.pravatar.cc/103",
  },
  {
    id: 4,
    name: "Jennifer Stewart",
    username: "jennifer",
    avatar: "https://i.pravatar.cc/104",
  },
];

const SuggestionsCard = () => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Suggested for you</h3>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </div>

            <Button variant="outline" size="sm" className="rounded-full">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SuggestionsCard;
