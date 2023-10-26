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
  Select,
  MenuItem,
} from "@mui/material";
import { TabContext, TabList, TabListProps, TabPanel } from "@mui/lab";
import { Facebook, Twitter } from "@mui/icons-material";

// Components Imports
import { CopyBtn } from "@/components";
import { CardRadio } from "./card-radio";
import { ThemeToggle } from "@/theme";

// Hooks Imports
import { useLogin } from "@/hooks";
import React from "react";

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

  const [tab, setTab] = React.useState("one");
  const tabChangeHandler: TabListProps["onChange"] = (evt, v) => {
    void evt;
    setTab(v);
  };

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
      <TabContext value={tab}>
        <Box display={"flex"} gap={5} p={2}>
          <Box
            flex={1}
            overflow={"hidden"}
            display={"flex"}
            alignItems={"center"}
          >
            <StyledTabList
              onChange={tabChangeHandler}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ alignItems: "center" }}
            >
              <Tab value="one" label={<TabLabel />} />
              <Tab value="two" label={<TabLabel />} />
              <Tab value="three" label={<TabLabel />} />
              <Tab value="four" label={<TabLabel />} />
              <Tab value="five" label={<TabLabel />} />
              <Tab value="six" label={<TabLabel />} />
              <Tab value="seven" label={<TabLabel />} />
              <Tab value="eight" label={<TabLabel />} />
              <Tab value="nine" label={<TabLabel />} />
              <Tab value="ten" label={<TabLabel />} />
            </StyledTabList>
          </Box>
          <Box>
            <Select value={"one"} onChange={() => {}}>
              <MenuItem value="one">woolworlds one</MenuItem>
              <MenuItem value="two">woolworlds two</MenuItem>
            </Select>
          </Box>
        </Box>
        <TabPanel value="one">one</TabPanel>
        <TabPanel value="two">two</TabPanel>
        <TabPanel value="three">three</TabPanel>
        <TabPanel value="four">four</TabPanel>
        <TabPanel value="five">five</TabPanel>
        <TabPanel value="six">six</TabPanel>
        <TabPanel value="seven">seven</TabPanel>
        <TabPanel value="eight">eight</TabPanel>
        <TabPanel value="nine">nine</TabPanel>
        <TabPanel value="ten">ten</TabPanel>
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
