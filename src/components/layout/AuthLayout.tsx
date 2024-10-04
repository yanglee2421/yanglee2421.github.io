import { Avatar, Badge, Box, IconButton, Link, styled } from "@mui/material";
import { useOutlet } from "react-router-dom";
import { ModeToggle } from "../shared/ModeToggle";
import { LangToggle } from "../shared/LangToggle";
import { GitHub } from "@mui/icons-material";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { useOnlineStatus } from "@/hooks/dom/useOnlineStatus";
import { AuthGuard } from "@/components/guard/AuthGuard";

const github_url = import.meta.env.VITE_GITHUB_URL;

export function AuthLayout() {
  const outlet = useOutlet();
  const user = useCurrentUser();
  const isOnline = useOnlineStatus();

  return (
    <AuthGuard>
      <LayoutWrapper>
        <Header>
          <GitHub fontSize="large" />
          <Box sx={{ marginInlineStart: "auto" }}></Box>
          <LangToggle />
          <ModeToggle />
          <IconButton href={github_url} target={github_url}>
            <GitHub />
          </IconButton>
          {user && (
            <Badge
              variant="dot"
              overlap="circular"
              color={isOnline ? "success" : "error"}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Avatar src={user.photoURL || ""}>
                {user.displayName?.substring(0, 1)}
              </Avatar>
            </Badge>
          )}
        </Header>
        <Aside></Aside>
        <AppWrapper>
          <Main>{outlet}</Main>
          <Footer>
            &copy;2024 by{" "}
            <Link href={github_url} target={github_url}>
              yanglee2421
            </Link>
          </Footer>
        </AppWrapper>
      </LayoutWrapper>
    </AuthGuard>
  );
}

const LayoutWrapper = styled("div")(({ theme: t }) => ({
  minHeight: "100dvh",
}));

const Header = styled("header")(({ theme: t }) => ({
  position: "sticky",
  insetBlockStart: 0,

  display: "flex",
  gap: 12,

  paddingInline: t.spacing(5),
  paddingBlock: t.spacing(2),

  boxShadow: t.shadows[1],
}));

const Aside = styled("aside")(({ theme: t }) => ({
  borderInlineEndStyle: "solid",
  borderInlineEndColor: t.palette.divider,

  [t.breakpoints.up("md")]: {
    position: "fixed",
    insetInlineStart: 0,
    inlineSize: t.spacing(96),
    blockSize: `calc(100dvh - ${t.spacing(14)})`,
    borderInlineEndWidth: 1,
  },
}));

const AppWrapper = styled("div")(({ theme: t }) => ({
  display: "flex",
  flexDirection: "column",

  [t.breakpoints.up("md")]: {
    paddingInlineStart: t.spacing(96),
    minBlockSize: `calc(100dvh - ${t.spacing(14)})`,
  },
}));

const Main = styled("main")(({ theme: t }) => ({
  flexGrow: 1,

  padding: t.spacing(2),
}));

const Footer = styled("footer")(({ theme: t }) => ({
  paddingInline: t.spacing(5),
  paddingBlock: t.spacing(2),
}));

export { AuthLayout as Component };
