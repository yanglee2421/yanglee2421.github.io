import { TranslateOutlined } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link, useLocation, useParams } from "react-router";

type LangLinkProps = React.PropsWithChildren<{
  locale: string;
}>;

const LangLink = (props: LangLinkProps) => {
  const location = useLocation();
  const params = useParams();

  return (
    <MenuItem
      component={Link}
      to={{
        pathname: location.pathname.replace(
          new RegExp(`^/${params.lang}`),
          `/${props.locale}`,
        ),
        search: location.search,
        hash: location.hash,
      }}
      selected={params.lang === props.locale}
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
      <Menu open={!!anchor} anchorEl={anchor} onClose={handleClose}>
        {locales.map((i) => (
          <LangLink key={i.locale} locale={i.locale}>{i.label}</LangLink>
        ))}
      </Menu>
    </>
  );
};
