import React from "react";

import { useAbility } from "@casl/react";

import type { AppAbility} from "@/utils/defineAbilityFor";
import { defineAbilityFor } from "@/utils/defineAbilityFor";

export const AclContext = React.createContext<AppAbility>(defineAbilityFor(""));
export const useAcl = () => useAbility(AclContext);
