import {
  alpha,
  Box,
  ButtonBase,
  IconButton,
  Link,
  styled,
} from "@mui/material";
import { NavLink, useOutlet } from "react-router-dom";
import { ModeToggle } from "../shared/ModeToggle";
import { LangToggle } from "../shared/LangToggle";
import { GitHub } from "@mui/icons-material";
import { AuthGuard } from "@/components/guard/AuthGuard";
import { UserDropdown } from "../shared/UserDropdonw";
import { ScrollView } from "../ui/ScrollView";

const github_url = import.meta.env.VITE_GITHUB_URL;

export function AuthLayout() {
  const outlet = useOutlet();

  return (
    <AuthGuard>
      <LayoutWrapper>
        <Aside sx={{ insetInlineStart: 0 }}>
          <div>
            <Nav>
              <Box
                sx={(t) => ({
                  paddingInline: 5,
                  paddingBlock: 2,
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  borderBottomColor: t.palette.divider,
                  display: "flex",
                  alignItems: "center",

                  backgroundColor: alpha(t.palette.background.default, 0.6),
                  backdropFilter: "blur(8px)",
                })}
              >
                <GitHub />
                <Box height={40}></Box>
              </Box>
              <Box component={"div"} sx={{ overflowY: "hidden", flexGrow: 1 }}>
                <ScrollView>
                  <ButtonBase
                    component={NavLink}
                    to="/overtime"
                    sx={(t) => ({
                      display: "block",
                      inlineSize: "100%",
                      paddingInline: 5,
                      paddingBlock: 2,
                      fontSize: t.typography.h5.fontSize,
                      fontWeight: t.typography.body1.fontWeight,
                    })}
                  >
                    overtime
                  </ButtonBase>
                  <ButtonBase
                    component={NavLink}
                    to="/minesweeper"
                    sx={(t) => ({
                      display: "block",
                      inlineSize: "100%",
                      paddingInline: 5,
                      paddingBlock: 2,
                      fontSize: t.typography.h5.fontSize,
                      fontWeight: t.typography.body1.fontWeight,
                    })}
                  >
                    minesweeper
                  </ButtonBase>

                  <Box height={1000}></Box>
                </ScrollView>
              </Box>
            </Nav>
          </div>
        </Aside>
        <AppWrapper>
          <Header>
            <Box sx={{ marginInlineStart: "auto" }}></Box>
            <LangToggle />
            <ModeToggle />
            <IconButton href={github_url} target={github_url}>
              <GitHub />
            </IconButton>
            <UserDropdown />
          </Header>
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
  display: "flex",
}));

const Aside = styled("aside")(({ theme: t }) => ({
  position: "absolute",
  zIndex: t.zIndex.drawer,
  insetInlineStart: `-100%`,
  transition: t.transitions.create("inset-inline-start"),

  inlineSize: "100%",

  backgroundColor: t.palette.background.default,

  [t.breakpoints.up("md")]: {
    position: "static",
    inlineSize: t.spacing(80),
  },
}));

const Nav = styled("nav")(({ theme: t }) => ({
  display: "flex",
  flexDirection: "column",

  position: "fixed",
  insetBlockStart: 0,

  inlineSize: "100%",
  blockSize: "100%",

  [t.breakpoints.up("md")]: {
    inlineSize: t.spacing(80),
  },
}));

const AppWrapper = styled("div")(({ theme: t }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,

  minBlockSize: "100dvh",
}));

const Header = styled("header")(({ theme: t }) => ({
  position: "fixed",
  insetBlockStart: 0,
  inlineSize: "100%",

  display: "flex",
  gap: 12,

  paddingInline: t.spacing(5),
  paddingBlock: t.spacing(2),

  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: t.palette.divider,

  backgroundColor: alpha(t.palette.background.default, 0.6),
  backdropFilter: "blur(8px)",

  [t.breakpoints.up("md")]: {
    inlineSize: `calc(100dvw - ${t.spacing(80)})`,
  },
}));

const Main = styled("main")(({ theme: t }) => ({
  flexGrow: 1,

  paddingBlockStart: t.spacing(14 + 5),
  paddingInline: t.spacing(5),
}));

const Footer = styled("footer")(({ theme: t }) => ({
  paddingInline: t.spacing(5),
  paddingBlock: t.spacing(2),
}));

export { AuthLayout as Component };
