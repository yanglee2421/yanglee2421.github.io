import { useOnlineStatus } from "@/hooks/dom/useOnlineStatus";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import classNames from "classnames";

export function UserProfile() {
  const user = useCurrentUser();
  const isOnline = useOnlineStatus();

  if (!user) {
    return;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Avatar>
          <AvatarImage src={user.photoURL || ""} />
          <AvatarFallback>{user.displayName}</AvatarFallback>
        </Avatar>
        <div
          className={classNames(
            "absolute bottom-0 end-0 size-2.5 rounded-full",
            isOnline ? "bg-green-500" : "bg-destructive",
          )}
        >
          {isOnline && (
            <div className="absolute inset-0 animate-ping rounded-full bg-inherit"></div>
          )}
        </div>
      </div>
      <div>
        <p className="text-sm">{user.displayName}</p>
        <p className="text-xs">{user.email}</p>
      </div>
    </div>
  );
}
