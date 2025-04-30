import {
  DashboardOutlined,
  CalendarTodayOutlined,
  CalculateOutlined,
  WalletOutlined,
  PeopleOutlineOutlined,
  CalendarMonthOutlined,
  SportsEsportsOutlined,
  QrCodeOutlined,
  ChatOutlined,
  ScienceOutlined,
  HandshakeOutlined,
  AppsOutlined,
  ChevronRightOutlined,
  TokenOutlined,
  ViewDayRounded,
} from "@mui/icons-material";
import { styled, alpha, Typography } from "@mui/material";
import { useParams, NavLink } from "react-router";

const LinkWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),

  "& a": {
    textDecoration: "none",
    color: theme.palette.text.primary,

    display: "flex",
    gap: theme.spacing(3),
    alignItem: "center",

    padding: theme.spacing(5),

    [theme.breakpoints.up("sm")]: {
      paddingInline: theme.spacing(3),
      paddingBlock: theme.spacing(3),
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
    to: "/calendar",
    label: "Calendar",
    icon: <CalendarTodayOutlined />,
  },
  {
    to: "/calculator",
    label: "Calculator",
    icon: <CalculateOutlined />,
  },
  {
    to: "/invoices",
    label: "Invoices",
    icon: <WalletOutlined />,
  },
  {
    to: "/staff",
    label: "Staff",
    icon: <PeopleOutlineOutlined />,
  },
  {
    to: "/overtime",
    label: "Overtime",
    icon: <CalendarMonthOutlined />,
  },
  {
    to: "/minesweeper",
    label: "Minesweeper",
    icon: <SportsEsportsOutlined />,
  },
  {
    to: "/qrcode",
    label: "qrcode",
    icon: <QrCodeOutlined />,
  },
  { to: "/chat", label: "Chat", icon: <ChatOutlined /> },
  {
    to: "/lab",
    label: "Lab",
    icon: <ScienceOutlined />,
  },
  {
    to: "/scrollbar",
    label: "Scrollbar",
    icon: <TokenOutlined />,
  },
  {
    to: "/handbook",
    label: "Handbook",
    icon: <HandshakeOutlined />,
  },
  {
    to: "/app",
    label: "App",
    icon: <AppsOutlined />,
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
