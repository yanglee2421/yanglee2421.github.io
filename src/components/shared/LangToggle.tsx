import React from "react";
import { Link, useLocation, useParams } from "react-router";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { TranslateOutlined } from "@mui/icons-material";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { calculateLocale, calculateLocalePathname } from "@/lib/utils";

type LangLinkProps = React.PropsWithChildren<{
  locale: string;
}>;

const LangLink = (props: LangLinkProps) => {
  const params = useParams();
  const location = useLocation();
  const fallbackLang = useLocalStore((store) => store.fallbackLang);

  const langSegment = params.lang;
  if (!langSegment) throw new Error("Invalid lang params");

  const locale = calculateLocale(fallbackLang, langSegment);
  const pathname = calculateLocalePathname(location.pathname, props.locale);
  const selected = locale === props.locale;

  return (
    <MenuItem
      component={Link}
      to={{
        pathname,
        search: location.search,
        hash: location.hash,
      }}
      selected={selected}
    >
      {props.children}
    </MenuItem>
  );
};

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
          <LangLink key={i.locale} locale={i.locale}>
            {i.label}
          </LangLink>
        ))}
      </Menu>
    </>
  );
};
