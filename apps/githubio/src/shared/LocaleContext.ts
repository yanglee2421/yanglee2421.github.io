import { LocaleService } from "@yotulee/run";
import React from "react";

export const localeService = new LocaleService(["en", "zh"]);
export const LocaleContext = React.createContext(localeService);

export const useLocale = () => {
  const localeService = React.use(LocaleContext);

  const locale = React.useSyncExternalStore(
    (onStoreChange) => {
      localeService.on(onStoreChange);
      return () => {
        localeService.off(onStoreChange);
      };
    },
    () => localeService.getLocale(),
  );

  return locale;
};
