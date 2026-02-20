import { Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  createTheme,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import React from "react";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: indigo[500],
    },
  },
});

export const Component = () => {
  const [username, setUsername] = React.useState("13800138000");
  const [password, setPassword] = React.useState("0000000");

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          position: "fixed",
          inset: 0,
          width: "100dvw",
          height: "100dvh",

          padding: 3,
        }}
      >
        <Box>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant="h4">智能充电柜</Typography>
              <Typography variant="body2" color="textSecondary">
                武铁紫云智能充电
              </Typography>
            </Grid>
            <Grid size={12}>
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="手机号"
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="密码"
                fullWidth
                type="password"
                slotProps={{
                  input: {
                    endAdornment: (
                      <IconButton>
                        <Visibility />
                      </IconButton>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel label="记住密码" control={<Checkbox />} />
                <Link
                  href="#"
                  sx={{
                    fontWeight: 500,
                  }}
                  underline="none"
                >
                  忘记密码?
                </Link>
              </Box>
            </Grid>
            <Grid size={12}>
              <Button fullWidth variant="contained">
                登录
              </Button>
            </Grid>
            <Grid size={12}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography color="textSecondary">新用户？</Typography>
                <Link underline="none">立即注册</Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
