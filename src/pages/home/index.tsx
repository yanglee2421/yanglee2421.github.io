// MUI Imports
import {
  Grid,
  Button,
  Stack,
  Tab,
  styled,
  useMediaQuery,
  Theme,
  Box,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Facebook, Twitter } from "@mui/icons-material";

// Components Imports
import { CopyBtn } from "@/components";
import { CardRadio } from "./card-radio";
import { ThemeToggle } from "@/theme";

// Hooks Imports
import { useLogin } from "@/hooks";

void Twitter;

const StyledTabList = styled(TabList)(({ theme }) => {
  return {
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: `${theme.palette.common.white} !important`,
    },
    "& .MuiTab-root": {
      minWidth: 65,
      minHeight: 38,
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.5),
      borderRadius: theme.shape.borderRadius,
      [theme.breakpoints.up("sm")]: {
        minWidth: 130,
      },
    },
  };
});

export function Component() {
  // Login Hooks
  const { signOut } = useLogin();

  return (
    <>
      <Grid container spacing={3} p={2}>
        <Grid item xs={12}>
          <Stack direction={"row"} spacing={2}>
            <Button onClick={signOut} variant="contained" color="error">
              sign out
            </Button>
            <CopyBtn text="2583169032" />
            <ThemeToggle />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <CardRadio />
        </Grid>
      </Grid>
      <TabContext value="one">
        <StyledTabList variant="scrollable">
          <Tab value="one" label={<TabLabel />} />
          <Tab value="two" label={<TabLabel />} />
        </StyledTabList>
        <TabPanel value="one"></TabPanel>
        <TabPanel value="two"></TabPanel>
      </TabContext>
    </>
  );
}

function TabLabel() {
  const isExtraSmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      sx={{
        "& svg": {
          mr: isExtraSmall ? 0 : 2,
        },
      }}
    >
      <Facebook />
      {isExtraSmall || "hello"}
    </Box>
  );
}
