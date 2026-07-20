import { NprogressBar } from "@/components/layout/nprogress";
import { ParticlesUI } from "@/components/layout/particles";
import {
  AddOutlined,
  AlignHorizontalLeftOutlined,
  Animation,
  CalendarMonthOutlined,
  DashboardOutlined,
  DragIndicator,
  HomeOutlined,
  ListOutlined,
  MessageOutlined,
  Print,
  QrCodeScanner,
  ScienceOutlined,
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { DialogsProvider } from "@toolpad/core";
import React from "react";
import {
  isRouteErrorResponse,
  Link,
  Outlet,
  ScrollRestoration,
  useRouteError,
} from "react-router";

const calculateSegment = (...args: unknown[]) => {
  return args.join("/");
};

const createNavition = (lang: string) => [
  { kind: "header", title: "Fontend" },
  {
    segment: calculateSegment(lang, "dashboard"),
    title: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    segment: calculateSegment(lang, "dnd"),
    title: "Drag & Drop",
    icon: <DragIndicator />,
  },
  { kind: "divider" },
  { kind: "header", title: "Table" },
  {
    title: "Overtime",
    icon: <CalendarMonthOutlined />,
    children: [
      {
        segment: calculateSegment(lang, "overtime"),
        title: "List",
        icon: <ListOutlined />,
      },
      {
        segment: calculateSegment(lang, "overtime", "new"),
        title: "Add",
        icon: <AddOutlined />,
      },
    ],
  },
  { kind: "divider" },
  { kind: "header", title: "App" },
  {
    segment: calculateSegment(lang, "snackbar"),
    title: "Snackbar",
    icon: <MessageOutlined />,
  },
  {
    segment: calculateSegment(lang, "lab"),
    title: "Lab",
    icon: <ScienceOutlined />,
  },
  {
    segment: calculateSegment(lang, "Animate"),
    title: "Animate",
    icon: <Animation />,
  },
  {
    segment: calculateSegment(lang, "rank"),
    title: "Rank",
    icon: <AlignHorizontalLeftOutlined />,
  },
  {
    segment: calculateSegment(lang, "qrcode"),
    title: "QR Code",
    icon: <QrCodeScanner />,
  },
  {
    title: "Print",
    icon: <Print />,
    segment: calculateSegment(lang, "print"),
  },
];

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
      <DialogsProvider>
        <Outlet />
      </DialogsProvider>
      <ParticlesUI preset="bubbles" />
      <Box sx={{ pointerEvents: "none" }}>
        <NprogressBar />
      </Box>
      <ScrollRestoration />
    </>
  );
};
