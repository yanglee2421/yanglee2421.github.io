import { useAbility } from "@casl/react";
import React from "react";
import { defineAbilityFor } from "@/libs/defineAbilityFor";
import type { AppAbility } from "@/libs/defineAbilityFor";

export const AclProvider = React.createContext<AppAbility>(
  defineAbilityFor(""),
);
export const useAcl = () => useAbility(AclProvider);
