import { useAcl } from "@/configs/acl/useAcl";
import React from "react";
import { Forbidden } from "./Forbidden";

export function AclGuard(props: Props) {
  const acl = useAcl();

  if (acl.can(props.action, props.subject)) {
    return props.children;
  }

  return <Forbidden></Forbidden>;
}

type Props = {
  action: string;
  subject: string;
  children: React.ReactNode;
};
