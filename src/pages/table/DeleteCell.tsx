import { firestore } from "@/api/firebase/app";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteDoc, doc } from "firebase/firestore";

export function DeleteButton(props: { id: string }) {
  const [isPending, startTransition] = React.useTransition();
  const queryClient = useQueryClient();

  return (
    <button
      onClick={() => {
        startTransition(async () => {
          await deleteDoc(doc(firestore, "joke", props.id));
          await queryClient.invalidateQueries({
            queryKey: ["firebase", "joke"],
          });
        });
      }}
      disabled={isPending}
      className="btn-red uppercase"
    >
      delete
    </button>
  );
}
