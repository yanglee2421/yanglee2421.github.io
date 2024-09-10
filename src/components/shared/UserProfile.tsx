import { useOnlineStatus } from "@/hooks/dom/useOnlineStatus";
import classNames from "classnames";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import React from "react";

export function UserProfile() {
  const user = useCurrentUser();
  const isOnline = useOnlineStatus();
  const [loaded, setLoaded] = React.useState(false);

  if (!user) {
    return;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt=""
            onLoad={() => {
              setLoaded(true);
            }}
            onError={() => {
              setLoaded(false);
            }}
            width={40}
            height={40}
            className={classNames("size-10 rounded-full", !loaded && "sr-only")}
          />
        )}

        {!loaded && (
          <div className="flex size-10 items-center justify-center rounded-full bg-red-500">
            <span className="text-xl tracking-widest text-white">YL</span>
          </div>
        )}
        <div
          className={classNames(
            "absolute bottom-0 end-0 z-10 size-2 rounded-full",
            isOnline
              ? "bg-green-500 after:absolute after:inset-0 after:animate-ping after:rounded-full after:bg-inherit after:content-['']"
              : "bg-gray-500",
          )}
        ></div>
      </div>
      <div>
        <p className="text-sm text-slate-900">{user.displayName}</p>
        <p className="text-xs text-slate-500">{user.email}</p>
      </div>
    </div>
  );
}
