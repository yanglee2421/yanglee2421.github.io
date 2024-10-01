import { createMongoAbility, AbilityBuilder } from "@casl/ability";
import type { MongoAbility } from "@casl/ability";

export function defineAbilityFor(role: string) {
  const abilityBuilder = new AbilityBuilder<AppAbility>(createMongoAbility);

  switch (role) {
    case "owner":
      abilityBuilder.can("manage", "all");
      break;
    case "admin":
      abilityBuilder.can("manage", "all");
      break;
    case "client":
      abilityBuilder.can("read", "all");
      break;
    default:
      abilityBuilder.can("read", "all");
  }

  return abilityBuilder.build();
}

export type AppAbility = MongoAbility<[string, string]>;
