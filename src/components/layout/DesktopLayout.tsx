import {
  RadioButtonCheckedOutlined,
  RadioButtonUncheckedOutlined,
} from "@mui/icons-material";
import { Box, Typography, IconButton, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";
import { useImmer } from "use-immer";

import { Materio } from "@/components/svg/Materio";
import { ScrollView } from "@/components/ui/ScrollView";
import { useThemeStore } from "@/hooks/store/useThemeStore";

export function DesktopLayout(props: React.PropsWithChildren) {
  const [state, updateState] = useImmer({
    isHovered: false,
  });

  const asideMenuCollapsed = useThemeStore((store) => store.asideMenuCollapsed);
  const setAsideMenuCollapsed = useThemeStore(
    (store) => store.setAsideMenuCollapsed,
  );

  const logoTextRef = React.useRef<HTMLElement>(null);

  const explandedContainer = state.isHovered || !asideMenuCollapsed;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      flexBasis={"auto"}
      flexGrow={1}
      flexShrink={1}
    >
      <Box display={"flex"} flexBasis={"auto"} flexGrow={1} flexShrink={1}>
        {/* Navigation Aside */}
        <Box
          component={"aside"}
          position={"sticky"}
          zIndex={(theme) => theme.zIndex.drawer + 1}
          top={0}
          sx={{
            inlineSize: asideMenuCollapsed ? collapsedWidth : explandedWidth,
            minInlineSize: asideMenuCollapsed ? collapsedWidth : explandedWidth,
            blockSize: "100dvh",
            transition(theme) {
              return theme.transitions.create([
                "inline-size",
                "min-inline-size",
              ]);
            },
          }}
        >
          {/* Navigation Aside Container */}
          <Box
            component={"div"}
            onMouseEnter={() => {
              updateState((draft) => {
                draft.isHovered = true;
              });
            }}
            onMouseLeave={() => {
              updateState((draft) => {
                draft.isHovered = false;
              });
            }}
            position={"relative"}
            borderRight={(theme) => `1px solid ${theme.palette.divider}`}
            sx={{
              inlineSize: "100%",
              minInlineSize: "100%",
              blockSize: "100%",
              transition(theme) {
                return theme.transitions.create([
                  "inline-size",
                  "min-inline-size",
                ]);
              },
              "&:hover": {
                inlineSize: explandedWidth,
                minInlineSize: explandedWidth,
              },
            }}
          >
            {/* Navigation Aside Container Background */}
            <Box
              position={"relative"}
              zIndex={3}
              display={"flex"}
              flexDirection={"column"}
              sx={{
                blockSize: "100%",
                overflowX: "hidden",
                overflowY: "auto",
                backgroundColor(theme) {
                  return theme.palette.background.default;
                },
              }}
            >
              {/* Navigation Aside Header */}
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                paddingInline={2}
                paddingBlock={3}
              >
                <StyledLink to={{ pathname: "/" }}>
                  <Materio></Materio>
                  <Transition
                    in={explandedContainer}
                    nodeRef={logoTextRef}
                    addEndListener={(done) => {
                      logoTextRef.current?.addEventListener(
                        "transitionend",
                        done,
                      );
                    }}
                    unmountOnExit
                  >
                    {(status) => {
                      return (
                        <Typography
                          ref={logoTextRef}
                          variant="h5"
                          noWrap
                          sx={(theme) => {
                            switch (status) {
                              case "exited":
                                return {
                                  opacity: 0,
                                  marginInlineStart: 0,
                                };
                              case "entering":
                                return {
                                  opacity: 1,
                                  marginInlineStart: "10px",
                                  transition: theme.transitions.create([
                                    "opacity",
                                    "margin-inline-start",
                                  ]),
                                };

                              case "entered":
                                return {
                                  opacity: 1,
                                  marginInlineStart: "10px",
                                };
                              case "exiting":
                                return {
                                  opacity: 0,
                                  marginInlineStart: 0,
                                  transition: theme.transitions.create([
                                    "opacity",
                                    "margin-inline-start",
                                  ]),
                                };

                              case "unmounted":
                              default:
                                return {};
                            }
                          }}
                        >
                          App Name
                        </Typography>
                      );
                    }}
                  </Transition>
                </StyledLink>

                {explandedContainer && (
                  <IconButton
                    onClick={() => {
                      setAsideMenuCollapsed((prev) => !prev);
                    }}
                  >
                    {asideMenuCollapsed ? (
                      <RadioButtonUncheckedOutlined></RadioButtonUncheckedOutlined>
                    ) : (
                      <RadioButtonCheckedOutlined></RadioButtonCheckedOutlined>
                    )}
                  </IconButton>
                )}
              </Box>

              {/* Navigation Aside Scroll */}
              <ScrollView options={{ wheelPropagation: false }}>
                <Box height={2000}>navigation</Box>
              </ScrollView>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          sx={{ inlineSize: "100%" }}
        >
          <Box component={"header"}>navbar</Box>
          <Box component={"main"}>{props.children}</Box>
          <Box component={"footer"}>footer</Box>
        </Box>
      </Box>
    </Box>
  );
}

const explandedWidth = 260;
const collapsedWidth = 68;

const StyledLink = styled(Link)({
  display: "flex",
  alignItems: "center",
  minBlockSize: 24,
  textDecoration: "none",
  color: "inherit",
  marginInlineStart: 8,
});
