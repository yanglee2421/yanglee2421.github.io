import {
  DashboardOutlined,
  CalendarTodayOutlined,
  CalculateOutlined,
  WalletOutlined,
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
  MessageOutlined,
  GroupAddOutlined,
  GroupOutlined,
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
    to: "/calendar",
    label: "Calendar",
    icon: <CalendarTodayOutlined />,
  },
  {
    to: "/invoices",
    label: "Invoices",
    icon: <WalletOutlined />,
  },
  {
    to: "/invoices/new",
    label: "Calculator",
    icon: <CalculateOutlined />,
  },
  {
    to: "/staff",
    label: "Staff",
    icon: <GroupOutlined />,
  },
  {
    to: "/staff/new",
    label: "Staff",
    icon: <GroupAddOutlined />,
  },
  {
    to: "/overtime",
    label: "Overtime",
    icon: <CalendarMonthOutlined />,
  },
  {
    to: "/overtime/new",
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
    label: "QRCode",
    icon: <QrCodeOutlined />,
  },
  {
    to: "/handbook",
    label: "Handbook",
    icon: <HandshakeOutlined />,
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
    to: "/app",
    label: "App",
    icon: <AppsOutlined />,
  },
  { to: "/chat", label: "Chat", icon: <ChatOutlined /> },
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
