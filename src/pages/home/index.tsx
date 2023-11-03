// MUI Imports
import {
  Tab,
  styled,
  useMediaQuery,
  Theme,
  Box,
  Select,
  MenuItem,
  SelectProps,
} from "@mui/material";
import { TabContext, TabList, TabListProps, TabPanel } from "@mui/lab";
import { Microsoft, Apple, YouTube, Instagram } from "@mui/icons-material";

// Components Imports
import { CardRadio } from "./card-radio";

// React Imports
import React from "react";

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
  const [tab, setTab] = React.useState("five");
  const tabChangeHandler: TabListProps["onChange"] = (evt, v) => {
    void evt;
    setTab(v);
  };

  const [selected, setSelected] = React.useState("five");
  const selecChgHandler: SelectProps["onChange"] = (evt) => {
    setSelected(String(evt.target.value));
  };

  return (
    <>
      <Box p={2}>
        <CardRadio />
      </Box>
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
              <Tab
                value="five"
                label={<TabLabel icon={<Microsoft />}>five</TabLabel>}
              />
              <Tab
                value="six"
                label={<TabLabel icon={<Apple />}>six</TabLabel>}
              />
              <Tab
                value="seven"
                label={<TabLabel icon={<YouTube />}>seven</TabLabel>}
              />
              <Tab
                value="eight"
                label={<TabLabel icon={<Instagram />}>eight</TabLabel>}
              />
            </StyledTabList>
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Select value={selected} onChange={selecChgHandler} size="small">
              <MenuItem value="five">woolworlds five</MenuItem>
              <MenuItem value="two">woolworlds two</MenuItem>
            </Select>
          </Box>
        </Box>
        <TabPanel value="five">five</TabPanel>
        <TabPanel value="six">six</TabPanel>
        <TabPanel value="seven">seven</TabPanel>
        <TabPanel value="eight">eight</TabPanel>
      </TabContext>
    </>
  );
}

function TabLabel(props: TabLabelProps) {
  // ** Props
  const { children, icon } = props;

  const isExtraSmall = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.down("sm");
  });

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
      {icon}
      {isExtraSmall || children}
    </Box>
  );
}

interface TabLabelProps {
  children: React.ReactNode;
  icon: React.ReactNode;
}
