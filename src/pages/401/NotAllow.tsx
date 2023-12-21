// MUI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";

// Components Imports
import { GlobalBg } from "@/components/ui";

// Router Imports
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";

export function NotAllow() {
  return (
    <>
      <GlobalBg />
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={4}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
      >
        <Card>
          <CardHeader
            title={
              <Stack direction={"row"} spacing={3}>
                <Box
                  width={32}
                  height={32}
                  bgcolor={"rgb(231, 227, 252)"}
                ></Box>
                <Box width={32} height={32} bgcolor={"rgb(58, 53, 65)"}></Box>
                <Box width={32} height={32} bgcolor={grey[50]}></Box>
                <Box width={32} height={32} bgcolor={grey[900]}></Box>
              </Stack>
            }
          />
          <CardContent>
            <Stack spacing={3}>
              <Stack direction={"row"} spacing={3}>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.primary.main}
                ></Box>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.secondary.main}
                ></Box>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.success.main}
                ></Box>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.error.main}
                ></Box>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.warning.main}
                ></Box>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.info.main}
                ></Box>
              </Stack>
              <Stack direction={"row"} spacing={3}>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.primary.light}
                ></Box>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.secondary.light}
                ></Box>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.success.light}
                ></Box>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.error.light}
                ></Box>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.warning.light}
                ></Box>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.info.light}
                ></Box>
              </Stack>
              <Stack direction={"row"} spacing={3}>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.primary.dark}
                ></Box>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.secondary.dark}
                ></Box>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.success.dark}
                ></Box>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.error.dark}
                ></Box>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.warning.dark}
                ></Box>
                <Box
                  width={32}
                  height={32}
                  bgcolor={(theme) => theme.palette.info.dark}
                ></Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
        <Button component={Link} to={"/"} variant="contained">
          Take me home
        </Button>
      </Box>
    </>
  );
}
