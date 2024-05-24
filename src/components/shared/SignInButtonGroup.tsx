import { ArrowDropDownOutlined } from "@mui/icons-material";
import {
  ButtonGroup,
  Button,
  Popper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grow,
  ClickAwayListener,
  Paper,
} from "@mui/material";
import React from "react";
import { Github } from "@/components/svg/Github";
import { Google } from "@/components/svg/Google";
import { SignInWithGithub } from "./SignInWithGithub";
import { SignInWithGoogle } from "./SignInWithGoogle";

export function SignInButtonGroup() {
  const buttonGroupRef = React.useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [platform, setPlatform] = React.useState("google");

  const handlePlatformChange = (platform: string) => {
    setPlatform(platform);
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonGroup ref={buttonGroupRef} color="secondary" size="large">
        {(() => {
          switch (platform) {
            case "github":
              return <SignInWithGithub />;
            case "google":
            default:
              return <SignInWithGoogle />;
          }
        })()}

        <Button
          onClick={() => {
            const buttonGroupEl = buttonGroupRef.current;
            if (!(buttonGroupEl instanceof HTMLElement)) {
              return;
            }

            setAnchorEl(buttonGroupEl);
          }}
          size="small"
        >
          <ArrowDropDownOutlined />
        </Button>
      </ButtonGroup>
      <Popper open={!!anchorEl} anchorEl={anchorEl} transition>
        {(props) => {
          return (
            <Grow {...props.TransitionProps}>
              <Paper>
                <ClickAwayListener
                  onClickAway={() => {
                    setAnchorEl(null);
                  }}
                >
                  <MenuList
                    sx={{
                      textTransform: "uppercase",
                      color(theme) {
                        return theme.palette.text.secondary;
                      },
                    }}
                  >
                    <MenuItem
                      onClick={handlePlatformChange.bind(null, "google")}
                    >
                      <ListItemIcon>
                        <Google width={26} height={26} />
                      </ListItemIcon>
                      <ListItemText primary="sign in with google" />
                    </MenuItem>
                    <MenuItem
                      onClick={handlePlatformChange.bind(null, "github")}
                    >
                      <ListItemIcon>
                        <Github width={24} height={24} />
                      </ListItemIcon>
                      <ListItemText primary="sign in with github" />
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          );
        }}
      </Popper>
    </>
  );
}
