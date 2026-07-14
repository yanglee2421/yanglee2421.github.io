import {
  AddRounded,
  ConstructionRounded,
  DevicesRounded,
  LogoutRounded,
  Menu as MenuIcon,
  MoreVertRounded,
  SmartphoneRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Breadcrumbs,
  createTheme,
  CssBaseline,
  Divider,
  GlobalStyles,
  IconButton,
  Link,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Select,
  selectClasses,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  useColorScheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const CustomLayoutSizeContext = React.createContext({
  sidebar: 36,
});

const Color = () => {
  const color = useColorScheme();

  React.useInsertionEffect(() => {
    color.setMode("light");
  }, []);

  return null;
};

export const CustomLayout = () => {
  const theme = useTheme();
  const smallThanMD = useMediaQuery(theme.breakpoints.down("md"));
  const SIDE_WIDTH = smallThanMD ? 0 : 32;

  return (
    <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
      <GlobalStyles styles={{ html: { colorScheme: "dark" } }} />
      <CssBaseline />
      <ToastContainer theme="dark" />
      <Color />
      <CustomLayoutSizeContext value={{ sidebar: SIDE_WIDTH }}>
        <CustomSiderBar />
        <Box
          sx={{
            paddingInlineStart: SIDE_WIDTH,
            isolation: "isolate",
          }}
        >
          <CustomHeader />
          <Box sx={{ px: 2, pt: 2 }}>
            <Stack>
              <Outlet />
              <Box sx={{ height: 2000 }}></Box>
            </Stack>
          </Box>
        </Box>
      </CustomLayoutSizeContext>
    </ThemeProvider>
  );
};

const CustomSiderBar = () => {
  const SIDE_WIDTH = React.use(CustomLayoutSizeContext);

  const [select, setSelect] = React.useState("");

  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: theme.zIndex.appBar,
        insetInlineStart: 0,
        insetBlock: 0,

        width: theme.spacing(SIDE_WIDTH.sidebar),
        borderInlineEnd: "1px solid",
        borderInlineEndColor: theme.palette.divider,

        display: "flex",
        flexDirection: "column",

        overflow: "hidden",

        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box sx={{ padding: 1.5 }}>
        <Select
          value={select}
          onChange={(e) => {
            setSelect(e.target.value);
          }}
          fullWidth
          displayEmpty
          sx={{
            [`& .${selectClasses.select}`]: {
              display: "flex",
              alignItems: "center",
              px: 1,
              py: 0,
            },
          }}
        >
          <ListSubheader sx={{ pt: 0 }}>Production</ListSubheader>
          <MenuItem value="">
            <ListItemAvatar>
              <Avatar alt="Sitemark web">
                <DevicesRounded sx={{ fontSize: "1rem" }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Sitemark-web" secondary="Web app" />
          </MenuItem>
          <MenuItem value={10}>
            <ListItemAvatar>
              <Avatar alt="Sitemark App">
                <SmartphoneRounded sx={{ fontSize: "1rem" }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Sitemark-app"
              secondary="Mobile application"
            />
          </MenuItem>
          <MenuItem value={20}>
            <ListItemAvatar>
              <Avatar alt="Sitemark Store">
                <DevicesRounded sx={{ fontSize: "1rem" }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Sitemark-Store" secondary="Web app" />
          </MenuItem>
          <ListSubheader>Development</ListSubheader>
          <MenuItem value={30}>
            <ListItemAvatar>
              <Avatar alt="Sitemark Store">
                <ConstructionRounded sx={{ fontSize: "1rem" }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Sitemark-Admin" secondary="Web app" />
          </MenuItem>
          <Divider />
          <MenuItem value={40}>
            <ListItemIcon>
              <AddRounded />
            </ListItemIcon>
            <ListItemText primary="Add product" secondary="Web app" />
          </MenuItem>
        </Select>
      </Box>
      <Divider />
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <Box
          sx={{
            blockSize: "100%",
            overflow: "auto",
          }}
        ></Box>
      </Box>
      <Divider />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
        }}
      >
        <Avatar
          sizes="small"
          alt="Riley Carter"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            Riley Carter
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            riley@email.com
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Box>
  );
};

const CustomHeader = () => {
  const layoutSize = React.use(CustomLayoutSizeContext);

  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          zIndex: theme.zIndex.appBar,
          insetInline: 0,
          insetBlockStart: 0,

          inlineSize: "100%",
          paddingInlineStart: layoutSize.sidebar,

          backgroundColor: theme.palette.background.default,
          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar>
          <Breadcrumbs sx={{ display: { xs: "none", md: "flex" } }}>
            <Link underline="hover" color="inherit" href="/">
              MUI
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Core
            </Link>
            <Typography
              sx={{
                color: "text.primary",
              }}
            >
              Breadcrumbs
            </Typography>
          </Breadcrumbs>
          <IconButton
            onClick={() => {
              toast.success(<>hello toast</>);
            }}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Box>
      <Toolbar sx={{ visibility: "hidden" }} />
    </>
  );
};

const OptionsMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <MoreVertRounded />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Add another account</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemText>Logout</ListItemText>
          <LogoutRounded />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
