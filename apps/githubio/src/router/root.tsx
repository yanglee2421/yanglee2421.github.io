import { NprogressBar } from "@/components/layout/nprogress";
import { ParticlesUI } from "@/components/layout/particles";
import { HomeOutlined } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import React from "react";
import {
  isRouteErrorResponse,
  Link,
  Outlet,
  ScrollRestoration,
  useRouteError,
} from "react-router";

interface ErrorContentProps {
  error: unknown;
  children?: React.ReactNode;
}

const ErrorContent = ({ error, children }: ErrorContentProps) => {
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <AlertTitle>{error.status}</AlertTitle>
        <Typography>{error.statusText}</Typography>
        {children}
      </>
    );
  }

  if (error instanceof Error) {
    return (
      <>
        <AlertTitle>Error</AlertTitle>
        <Typography>{error.message}</Typography>
        <Typography variant="body2">{error.stack}</Typography>
        {children}
      </>
    );
  }

  return (
    <>
      <AlertTitle>Error</AlertTitle>
      <Typography>Unknown error please contact support</Typography>
      {children}
    </>
  );
};

export const RootErrorBoundary = () => {
  const error = useRouteError();

  return (
    <Box sx={{ padding: 6 }}>
      <Alert severity="error" variant="outlined">
        <ErrorContent error={error}>
          <Link to="/">
            <Button startIcon={<HomeOutlined />} color="error">
              Take me to home
            </Button>
          </Link>
        </ErrorContent>
      </Alert>
    </Box>
  );
};

export const RootHydrateFallback = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={64} />
    </Box>
  );
};

export const RootRoute = () => {
  return (
    <>
      <Outlet />
      <ParticlesUI preset="bubbles" />
      <Box sx={{ pointerEvents: "none" }}>
        <NprogressBar />
      </Box>
      <ScrollRestoration />
    </>
  );
};
