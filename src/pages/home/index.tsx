// MUI Imports
import {
  useMediaQuery,
  Theme,
  Box,
  Select,
  MenuItem,
  SelectProps,
  Fade,
  Chip,
  alpha,
  Tab,
  TabsProps,
  Tabs,
  Paper,
  List,
  Button,
  ListItem,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  Microsoft,
  Apple,
  YouTube,
  Instagram,
  DeleteOutlined,
} from "@mui/icons-material";

// Components Imports
import { CardRadio } from "./card-radio";
import { FiveForm } from "./FiveForm";
import { QueryBoard } from "./QueryBoard";
import { SwitchTransition, TransitionGroup } from "react-transition-group";

// React Imports
import React from "react";

export function Component() {
  const [tab, setTab] = React.useState("1");
  const [selected, setSelected] = React.useState("five");
  const [fruitsInBasket, setFruitsInBasket] = React.useState(FRUITS.slice());

  const handleTabChange: TabsProps["onChange"] = (evt, v) => {
    void evt;
    React.startTransition(() => {
      setTab(v);
    });
  };

  const handleSelectChange: SelectProps["onChange"] = (evt) => {
    setSelected(String(evt.target.value));
  };

  const handleAddFruit = () => {
    const nextHiddenItem = FRUITS.find((i) => {
      return !fruitsInBasket.includes(i);
    });

    if (nextHiddenItem) {
      setFruitsInBasket((prev) => {
        return [nextHiddenItem, ...prev];
      });
    }
  };

  const handleRemoveFruit = (item: string) => {
    setFruitsInBasket((prev) => {
      return prev.filter((i) => {
        return i !== item;
      });
    });
  };

  const tabPanelNode = (() => {
    switch (tab) {
      case "1":
        return <FiveForm></FiveForm>;
      case "2":
        return <QueryBoard></QueryBoard>;
      case "3":
        return (
          <Paper sx={{ padding: 3 }}>
            <Chip
              label="Success"
              sx={(theme) => {
                return {
                  color: theme.palette.success.dark,
                  bgcolor: alpha(theme.palette.success.dark, 0.12),
                };
              }}
            ></Chip>
          </Paper>
        );
      case "4":
        return (
          <Paper sx={{ padding: 3 }}>
            <Button
              onClick={handleAddFruit}
              variant="contained"
              disabled={fruitsInBasket.length >= FRUITS.length}
            >
              Add fruit to basket
            </Button>
            <List>
              <TransitionGroup>
                {fruitsInBasket.map((item) => {
                  return (
                    <Collapse key={item}>
                      <ListItem
                        secondaryAction={
                          <IconButton onClick={() => handleRemoveFruit(item)}>
                            <DeleteOutlined></DeleteOutlined>
                          </IconButton>
                        }
                      >
                        {item}
                      </ListItem>
                    </Collapse>
                  );
                })}
              </TransitionGroup>
            </List>
          </Paper>
        );
      default:
        return null;
    }
  })();

  return (
    <>
      <Box>
        <CardRadio></CardRadio>
      </Box>

      <Box display={"flex"} gap={5}>
        <Box
          flex={1}
          overflow={"hidden"}
          display={"flex"}
          alignItems={"center"}
          paddingBlock={3}
        >
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ alignItems: "center" }}
          >
            <Tab
              value="1"
              label={<TabLabel icon={<Microsoft></Microsoft>}>five</TabLabel>}
            ></Tab>
            <Tab
              value="2"
              label={<TabLabel icon={<Apple></Apple>}>Query Board</TabLabel>}
            ></Tab>
            <Tab
              value="3"
              label={<TabLabel icon={<YouTube></YouTube>}>seven</TabLabel>}
            ></Tab>
            <Tab
              value="4"
              label={<TabLabel icon={<Instagram></Instagram>}>eight</TabLabel>}
            ></Tab>
          </Tabs>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Select value={selected} onChange={handleSelectChange} size="small">
            <MenuItem value="five">woolworlds five</MenuItem>
            <MenuItem value="two">woolworlds two</MenuItem>
          </Select>
        </Box>
      </Box>

      <SwitchTransition>
        <Fade key={tab} unmountOnExit>
          <Box>{tabPanelNode}</Box>
        </Fade>
      </SwitchTransition>
    </>
  );
}

const TabLabel = React.forwardRef((props: TabLabelProps, ref) => {
  // ** Props
  const { children, icon } = props;

  const isExtraSmall = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.down("sm");
  });

  return (
    <Box
      ref={ref}
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
});
interface TabLabelProps {
  children: React.ReactNode;
  icon: React.ReactNode;
}

const FRUITS = [
  "🍏 Apple",
  "🍌 Banana",
  "🍍 Pineapple",
  "🥥 Coconut",
  "🍉 Watermelon",
];
