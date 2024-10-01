import { useAbility } from "@casl/react";
import React from "react";
import { defineAbilityFor, type AppAbility } from "@/lib/defineAbilityFor";

export const AclProvider = React.createContext<AppAbility>(
  defineAbilityFor(""),
);
export const useAcl = () => useAbility(AclProvider);
