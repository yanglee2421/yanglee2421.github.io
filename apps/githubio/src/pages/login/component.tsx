import { authClient } from "@/shared/auth-client";
import React from "react";
import { useNavigate } from "react-router";

export const Component = () => {
  const status = React.useSyncExternalStore(
    (onStoreChange) => {
      const s = authClient.when("state").subscribe(onStoreChange);

      return () => {
        s.unsubscribe();
      };
    },
    () => authClient.status,
  );

  const navigate = useNavigate();
  React.useEffect(() => {
    const s = authClient.when("signIn").subscribe(() => {
      navigate("/lab");
    });

    return () => {
      s.unsubscribe();
    };
  }, []);

  return (
    <>
      <p>{status}</p>
      <button
        onClick={() => {
          authClient.signIn();
        }}
      >
        login
      </button>
      <button
        onClick={() => {
          authClient.signOut();
        }}
      >
        logout
      </button>
    </>
  );
};
