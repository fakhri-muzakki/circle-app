import { Heart, MessageCircle } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import type { Reply } from "@/shared/types";
import { Link } from "react-router";

const ReplyCard = ({ avatar, content, name, image, username }: Reply) => {
  return (
    <div className="p-4 border-t">
      <img
        src={image}
        className="mt-3 rounded-xl border border-white/10 mb-2"
      />
      {/* Avatar */}
      <div className="flex gap-3">
        <Link to={`/${username}`}>
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <Link to={`/${username}`} className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{name}</span>
            <span className="text-muted-foreground">{username}</span>
            {/* <span className="text-muted-foreground">· {time}</span> */}
          </Link>

          {/* Text */}
          <p className="text-sm mt-1 whitespace-pre-line">{content}</p>

          {/* Actions */}
          <div className="flex items-center gap-6 mt-3 text-muted-foreground text-sm">
            <div className="flex items-center gap-1">
              <Heart size={16} />
              <span>0</span>
            </div>

            <div className="flex items-center gap-1">
              <MessageCircle size={16} />
              <span>0 Replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyCard;
