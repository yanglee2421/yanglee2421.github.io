// Acl Imports
import { useAbility } from "@casl/react";

// React Imports
import React from "react";

// Types Imports
import { AppAbility, defineAbilityFor } from "./define-ability-for";

export const AclContext = React.createContext<AppAbility>(defineAbilityFor(""));
export const useAcl = () => useAbility(AclContext);
