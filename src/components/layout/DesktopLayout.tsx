import { Box, Typography, IconButton } from "@mui/material";
import { ScrollView } from "@/components/ui/ScrollView";
import {
  RadioButtonCheckedOutlined,
  RadioButtonUncheckedOutlined,
} from "@mui/icons-material";
import React from "react";
import { useImmer } from "use-immer";

export function DesktopLayout(props: React.PropsWithChildren) {
  const [state, updateState] = useImmer({
    width: 260,
    collapsed: false,
  });

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      flexBasis={"auto"}
      flexGrow={1}
      flexShrink={1}
    >
      <Box display={"flex"} flexBasis={"auto"} flexGrow={1} flexShrink={1}>
        <Box
          component={"aside"}
          position={"sticky"}
          top={0}
          height={"100dvh"}
          width={state.collapsed ? 68 : 260}
          sx={{
            transition(theme) {
              return theme.transitions.create("width");
            },
          }}
        >
          <Box
            position={"relative"}
            width={"100%"}
            height={"100%"}
            borderRight={(theme) => `1px solid ${theme.palette.divider}`}
            sx={{
              transition(theme) {
                return theme.transitions.create("width");
              },
              "&:hover": {
                width: 260,
              },
            }}
          >
            <Box
              position={"relative"}
              zIndex={3}
              height={"100%"}
              display={"flex"}
              flexDirection={"column"}
              sx={{
                overflowX: "hidden",
                overflowY: "auto",
                backgroundColor(theme) {
                  return theme.palette.background.default;
                },
              }}
            >
              <Box>
                <Typography>App Name</Typography>
                <IconButton
                  onClick={() => {
                    updateState((draft) => {
                      draft.collapsed = !draft.collapsed;
                    });
                  }}
                >
                  {state.collapsed ? (
                    <RadioButtonUncheckedOutlined></RadioButtonUncheckedOutlined>
                  ) : (
                    <RadioButtonCheckedOutlined></RadioButtonCheckedOutlined>
                  )}
                </IconButton>
              </Box>
              <ScrollView>navigation</ScrollView>
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"column"}>
          <Box component={"header"}>navbar</Box>
          <Box component={"main"}>{props.children}</Box>
          <Box component={"footer"}>footer</Box>
        </Box>
      </Box>
    </Box>
  );
}
