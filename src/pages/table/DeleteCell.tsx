import { firestore } from "@/api/firebase/app";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { LucideDelete } from "lucide-react";

export function DeleteButton(props: { id: string }) {
  const [isPending, startTransition] = React.useTransition();
  const queryClient = useQueryClient();

  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          await deleteDoc(doc(firestore, "joke", props.id));
          await queryClient.invalidateQueries({
            queryKey: ["firebase", "joke"],
          });
        });
      }}
      disabled={isPending}
      variant={"ghost"}
      size="icon"
    >
      <LucideDelete className="text-destructive" />
    </Button>
  );
}
