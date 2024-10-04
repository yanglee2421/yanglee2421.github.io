import { Box, ButtonBase, IconButton, Link, styled } from "@mui/material";
import { NavLink, useOutlet } from "react-router-dom";
import { ModeToggle } from "../shared/ModeToggle";
import { LangToggle } from "../shared/LangToggle";
import { GitHub } from "@mui/icons-material";
import { AuthGuard } from "@/components/guard/AuthGuard";
import { UserDropdown } from "../shared/UserDropdonw";

const github_url = import.meta.env.VITE_GITHUB_URL;

export function AuthLayout() {
  const outlet = useOutlet();

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
          <UserDropdown />
        </Header>
        <Aside>
          <ButtonBase
            component={NavLink}
            to="/overtime"
            sx={(t) => ({
              display: "block",
              inlineSize: "100%",
              paddingInline: 5,
              paddingBlock: 2,
              fontSize: t.typography.body1.fontSize,
            })}
          >
            overtime
          </ButtonBase>
        </Aside>
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

  padding: t.spacing(4),
}));

const Footer = styled("footer")(({ theme: t }) => ({
  paddingInline: t.spacing(5),
  paddingBlock: t.spacing(2),
}));

export { AuthLayout as Component };
