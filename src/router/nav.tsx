import {
  DashboardOutlined,
  CalendarMonthOutlined,
  ScienceOutlined,
  AppsOutlined,
  ChevronRightOutlined,
  TokenOutlined,
  ViewDayRounded,
  MessageOutlined,
  AlignHorizontalLeftOutlined,
} from "@mui/icons-material";
import { styled, alpha, Typography } from "@mui/material";
import { useParams, NavLink } from "react-router";

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
    to: "/dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    to: "/overtime",
    label: "Overtime",
    icon: <CalendarMonthOutlined />,
  },
  {
    to: "/overtime/new",
    label: "Overtime New",
    icon: <CalendarMonthOutlined />,
  },
  {
    to: "/snackbar",
    label: "Snackbar",
    icon: <MessageOutlined />,
  },
  {
    to: "/lab",
    label: "Lab",
    icon: <ScienceOutlined />,
  },
  {
    to: "/rank",
    label: "Rank",
    icon: <AlignHorizontalLeftOutlined />,
  },
  {
    to: "/app",
    label: "App",
    icon: <AppsOutlined />,
  },
  {
    to: "/scrollbar",
    label: "Scrollbar",
    icon: <TokenOutlined />,
  },
  {
    to: "/virtual",
    label: "Virtual",
    icon: <ViewDayRounded />,
  },
];

export const NavMenu = () => {
  const params = useParams();

  return (
    <LinkWrapper>
      {list.map((i) => (
        <NavLink key={i.to} to={`/${params.lang + i.to}`} end>
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
