import { useLocalStore } from "@/hooks/store/useLocalStore";
import { LocaleContext, useLocale } from "@/shared/LocaleContext";
import { TranslateOutlined } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router";

const locales = [
  {
    locale: "en",
    label: "English",
  },
  {
    locale: "zh",
    label: "简体中文",
  },
];

export const LangToggle = () => {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

  const localeService = React.use(LocaleContext);

  const locale = useLocale();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
        <TranslateOutlined />
      </IconButton>
      <Menu
        open={!!anchor}
        anchorEl={anchor}
        onClose={handleClose}
        onClick={handleClose}
      >
        {locales.map((i) => (
          <MenuItem
            key={i.locale}
            onClick={() => {
              console.log("clicked");

              localeService.setLocale(i.locale);
              useLocalStore.setState((draft) => {
                draft.fallbackLang = i.locale;
              });

              navigate({
                pathname: localeService.resolvePathname(
                  location.pathname,
                  true,
                ),
                search: location.search,
                hash: location.hash,
              });
            }}
            selected={i.locale === locale}
          >
            {i.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
