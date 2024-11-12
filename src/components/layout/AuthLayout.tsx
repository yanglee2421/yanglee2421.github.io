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
import { CloseOutlined, GitHub, MenuOutlined } from "@mui/icons-material";
import { AuthGuard } from "@/components/guard/AuthGuard";
import { UserDropdown } from "../shared/UserDropdonw";
import { useLocaleStore } from "@/hooks/store/useLocaleStore";

const github_url = import.meta.env.VITE_GITHUB_URL;

export function AuthLayout() {
  const outlet = useOutlet();
  const showMenuInMobile = useLocaleStore((s) => s.showMenuInMobile);
  const update = useLocaleStore((s) => s.update);

  return (
    <AuthGuard>
      <Header>
        <GitHub sx={{ display: { xs: "none", md: "unset" } }} />
        <IconButton
          onClick={() => {
            update((d) => {
              d.showMenuInMobile = !d.showMenuInMobile;
            });
          }}
          sx={{ display: { md: "none" } }}
        >
          {showMenuInMobile ? <CloseOutlined /> : <MenuOutlined />}
        </IconButton>
        <Box sx={{ marginInlineStart: "auto" }}></Box>
        <LangToggle />
        <ModeToggle />
        <IconButton href={github_url} target={github_url}>
          <GitHub />
        </IconButton>
        <UserDropdown />
      </Header>
      <Aside sx={{ maxInlineSize: showMenuInMobile ? "none" : 0 }}>
        <Nav>
          <Box component={"div"} sx={{ overflowY: "auto", flexGrow: 1 }}>
            <ButtonBase
              component={NavLink}
              to="/dashboard"
              sx={(t) => ({
                display: "block",
                inlineSize: "100%",
                paddingInline: 5,
                paddingBlock: 2,
                fontSize: t.typography.h5.fontSize,
                fontWeight: t.typography.body1.fontWeight,
              })}
            >
              dashboard
            </ButtonBase>
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
          </Box>
        </Nav>
      </Aside>
      <MainWrapper sx={{ display: showMenuInMobile ? "none" : "flex" }}>
        <Main>{outlet}</Main>
        <Footer>
          &copy;2024 by{" "}
          <Link href={github_url} target={github_url}>
            yanglee2421
          </Link>
        </Footer>
      </MainWrapper>
    </AuthGuard>
  );
}

const Header = styled("header")(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.drawer + 1,

  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),

  inlineSize: "100%",
  blockSize: theme.spacing(14),
  paddingInline: theme.spacing(5),
  paddingBlock: theme.spacing(2),
  borderBlockEnd: `1px ${theme.palette.divider} solid`,

  backgroundColor: alpha(theme.palette.background.default, 0.6),
  backdropFilter: "blur(8px)",
}));

const Aside = styled("aside")(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.drawer,
  maxInlineSize: 0,

  inlineSize: "100dvw",
  blockSize: "100dvh",
  paddingBlockStart: theme.spacing(14),

  [theme.breakpoints.up("md")]: {
    maxInlineSize: theme.spacing(72),
  },

  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
}));

const Nav = styled("nav")(({ theme }) => ({
  maxBlockSize: "100%",

  overflow: "auto",
  borderInlineEnd: `1px solid ${theme.palette.divider}`,
}));

const MainWrapper = styled("div")(({ theme }) => ({
  flexDirection: "column",

  minBlockSize: "100dvh",
  paddingBlockStart: theme.spacing(14),

  paddingInlineStart: 0,
  [theme.breakpoints.up("md")]: {
    display: "flex",
    paddingInlineStart: theme.spacing(72),
  },
}));

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,

  paddingInline: theme.spacing(5),
  paddingBlock: theme.spacing(2),
}));

const Footer = styled("footer")(({ theme }) => ({
  paddingInline: theme.spacing(5),
  paddingBlock: theme.spacing(2),
}));

export { AuthLayout as Component };
