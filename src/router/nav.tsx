import { useParams, NavLink } from "react-router";
import { styled, alpha, Typography } from "@mui/material";
import { useSearchParams, Navigate, useLocation } from "react-router";
import { ChevronRightOutlined, DashboardOutlined } from "@mui/icons-material";
import { HOME_PATH, LOGIN_PATH } from "@/lib/constants";
import { useLocalStore } from "@/hooks/store/useLocalStore";

export const NavigateToHome = () => {
  const [searchParams] = useSearchParams();
  const search = new URLSearchParams(searchParams);
  search.delete("redirect_uri");

  return (
    <Navigate
      to={{
        pathname: searchParams.get("redirect_uri") || HOME_PATH,
        search: search.toString(),
      }}
      replace
    />
  );
};

export const NavigateToLogin = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const search = new URLSearchParams(searchParams);
  search.set("redirect_uri", location.pathname);

  return (
    <Navigate
      to={{
        pathname: LOGIN_PATH,
        search: search.toString(),
      }}
      replace
    />
  );
};

const LinkWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),

  "& a": {
    textDecoration: "none",
    color: theme.palette.text.primary,

    display: "flex",
    gap: theme.spacing(1.5),
    alignItem: "center",

    padding: theme.spacing(2.5),

    [theme.breakpoints.up("sm")]: {
      paddingInline: theme.spacing(1.5),
      paddingBlock: theme.spacing(1.5),
    },
  },
  "& a:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& a[aria-current=page]": {
    color: theme.palette.primary.main,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.activatedOpacity,
    ),
  },
}));

const list = [
  {
    to: "/dnd/basic-setup",
    label: "basic setup",
    icon: <DashboardOutlined />,
  },
];

export const NavMenu = () => {
  const params = useParams();
  const fallbackLang = useLocalStore((store) => store.fallbackLang);
  const lang = params.lang || fallbackLang;

  console.log(params, lang);

  return (
    <LinkWrapper>
      {list.map((i) => (
        <NavLink key={i.to} to={`/${lang + i.to}`} end>
          {i.icon}
          <Typography variant="body1" component="span">
            {i.label}
          </Typography>
          <ChevronRightOutlined sx={{ marginInlineStart: "auto" }} />
        </NavLink>
      ))}
    </LinkWrapper>
  );
};

NavMenu.list = list;
