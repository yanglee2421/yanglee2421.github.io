import bg from "@/assets/images/justHer.jpg";
import {
  alpha,
  Box,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  LinearProgress,
  Slider as MuiSlider,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { Slider } from "./Slider";
import "./border.css";

const calculateAssetsHref = (path: string) => {
  return new URL(path, import.meta.url).href;
};

const mockDataInitializer = () => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Row ${i + 1}`,
    description: `Description ${i + 1}`,
  }));
};

const columnHelper = createColumnHelper<{
  id: number;
  title: string;
  description: string;
}>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => <Cell>{info.getValue()}</Cell>,
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => <Cell>{info.getValue()}</Cell>,
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => <Cell>{info.getValue()}</Cell>,
  }),
];

const WebSocketCard = () => {
  const [data, setData] = React.useState("");
  const [input, setInput] = React.useState("");

  const ref = React.useRef<WebSocket | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    const connect = () => {
      ref.current = new WebSocket("ws://localhost:8080");

      ref.current.addEventListener("open", () => {}, controller);
      ref.current.addEventListener(
        "close",
        async () => {
          connect();
        },
        controller,
      );
      ref.current.addEventListener(
        "message",
        (e) => {
          setData(String(e.data));
        },
        controller,
      );
      ref.current.addEventListener("error", () => {}, controller);
    };

    connect();

    return () => {
      controller.abort();
      ref.current?.close();
      ref.current = null;
    };
  }, [setData]);

  return (
    <Card>
      <CardHeader title="WebSocket" subheader={data || "Placeholder"} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            ref.current?.send(input);
          }}
        >
          send
        </Button>
        <Button>reset</Button>
      </CardActions>
    </Card>
  );
};

const Cell = (props: React.PropsWithChildren) => {
  const [editable, setEditable] = React.useState(false);

  if (editable) {
    return (
      <TextField
        autoFocus
        fullWidth
        onBlur={() => setEditable(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setEditable(false);
          }
        }}
      />
    );
  }

  return (
    <ButtonBase onClick={() => setEditable(true)}>{props.children}</ButtonBase>
  );
};

const AnimateBorderButton = () => {
  const theme = useTheme();

  return (
    <ButtonBase
      sx={{
        paddingInline: 2,
        paddingBlock: 1,

        borderColor: "transparent",
        borderWidth: 3,
        borderStyle: "solid",
        borderRadius: (theme) => theme.shape.borderRadius + "px",

        position: "relative",
        isolation: "isolate",

        animation: "glow 4s infinite linear",

        background: `linear-gradient(${alpha(theme.palette.background.default, 1)} 0 0) padding-box,
        conic-gradient(from var(--glow-deg),#399953 0deg 90deg, #fbb300 90deg 180deg,#d53e33 180deg 270deg,#377af5 270deg 360deg) border-box`,
      }}
    >
      Google
    </ButtonBase>
  );
};

const AnimateBorderButton2 = () => {
  const theme = useTheme();

  return (
    <ButtonBase
      sx={{
        paddingInline: 2,
        paddingBlock: 1,

        borderColor: "transparent",
        borderWidth: 3,
        borderStyle: "solid",
        borderRadius: (theme) => theme.shape.borderRadius + "px",

        position: "relative",
        isolation: "isolate",

        animation: "glow 4s infinite linear",

        background: `linear-gradient(${alpha(theme.palette.background.default, 1)} 0 0) padding-box,
        conic-gradient(from var(--glow-deg),${theme.palette.divider},rgb(245, 118, 60),${theme.palette.divider} 30%) border-box`,
      }}
    >
      Search
    </ButtonBase>
  );
};

const GoogleButton = (props: React.PropsWithChildren) => {
  const theme = useTheme();

  return (
    <ButtonBase
      sx={{
        // Padding box background must forward to the border box background
        background: `linear-gradient(${alpha(theme.palette.background.default, 1)} 0 0) padding-box,
        conic-gradient(from var(--glow-deg),#13f41c,#33acf1) border-box`,

        paddingInline: 2,
        paddingBlock: 1,

        borderColor: "transparent",
        borderWidth: 3,
        borderStyle: "solid",
        borderRadius: theme.shape.borderRadius + "px",

        position: "relative",
        isolation: "isolate",

        animation: "glow 8s infinite linear",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: "0.125rem",
          zIndex: -1,

          borderRadius: "inherit",

          background: `linear-gradient(${theme.palette.background.default} 0 0)`,
          filter: "blur(1rem)",
          transformOrigin: "center",
          scale: "1 1",
        }}
      ></Box>
      {props.children}
      <Box
        sx={{
          position: "absolute",
          inset: "-0.125rem",
          zIndex: -2,
          borderRadius: "inherit",
          background: `conic-gradient(from var(--glow-deg),#13f41c,#33acf1) border-box`,
          filter: "blur(1rem)",
          opacity: 0.25,
        }}
      ></Box>
    </ButtonBase>
  );
};

const EditableTable = () => {
  "use no memo";
  const [data] = React.useState(mockDataInitializer);

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns,
    getRowId: (row) => String(row.id),
    data,
    getPaginationRowModel: getPaginationRowModel(),
  });

  const renderBody = () => {
    return table.getRowModel().rows.map((row) => (
      <TableRow key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 1 }}>
        <GoogleButton>Click me</GoogleButton>
        <AnimateBorderButton />
        <AnimateBorderButton2 />
      </Box>
      <Card>
        <CardHeader title="Editable Table" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Search" fullWidth placeholder="Search..." />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Filter" fullWidth placeholder="Filter..." />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardContent>
          <Stack spacing={1} direction={"row"}>
            <Button variant="contained">Add New Row</Button>
          </Stack>
        </CardContent>
        <LinearProgress />
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableCell key={h.id}>
                      {h.isPlaceholder ||
                        flexRender(h.column.columnDef.header, h.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>{renderBody()}</TableBody>
            <TableFooter>
              {table.getFooterGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableCell key={h.id}>
                      {h.isPlaceholder ||
                        flexRender(h.column.columnDef.footer, h.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          </Table>
        </TableContainer>
        <TablePagination
          component={"div"}
          count={table.getRowCount()}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page);
          }}
          onRowsPerPageChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Card>
    </>
  );
};

const StackContextDemo = () => {
  const [enableIsolation, setIsolation] = React.useState(false);

  return (
    <Box sx={{ isolation: "isolate", height: 400 }}>
      <FormControlLabel
        control={
          <Switch
            checked={enableIsolation}
            onChange={(event) => setIsolation(event.target.checked)}
          />
        }
        label="Enable Isolation"
      />
      <Box>
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            height: 200,
            width: 200,
            backgroundColor: (theme) => alpha(theme.palette.error.main, 1),
          }}
        >
          <Typography variant="h2">2</Typography>
        </Box>
      </Box>
      <Box sx={{ isolation: enableIsolation ? "isolate" : "auto" }}>
        <Box
          sx={{
            position: "relative",
            zIndex: 3,
            height: 200,
            width: 200,
            backgroundColor: (theme) => alpha(theme.palette.success.main, 1),
            top: -100,
          }}
        >
          <Typography variant="h2">3</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const ActivityDemo = () => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Switch
        checked={show}
        onChange={(e) => {
          setShow(e.target.checked);
        }}
      />
      <React.Activity mode={show ? "visible" : "hidden"}>
        <iframe src="https://www.bilibili.com/" height={500}></iframe>
        <h1>Activity</h1>
        <OtherComponent />
      </React.Activity>
    </>
  );
};

const OtherComponent = () => {
  return (
    <span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
      provident voluptates dolores veritatis omnis sed pariatur porro, nihil
      fugit tempore odio odit maxime ex modi dolorum nesciunt nulla neque
      molestias.
    </span>
  );
};

export const Component = () => {
  const bgImgHref = calculateAssetsHref(bg);

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius(theme) {
            return theme.shape.borderRadius + "px";
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,

            backgroundImage: `url(${bgImgHref})`,
            backgroundPosition: "50%",
            backgroundSize: "150%",

            filter: "blur(15px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 2,

            backgroundColor: alpha(grey[700], 0.4),
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 3,

            display: "flex",
            alignItems: "center",

            height: 320,

            padding: 4,
          }}
        >
          <img src={bgImgHref} width={192} height={108} />
        </Box>
      </Box>

      <Card>
        <CardHeader title="Slider" subheader=" slider input" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <FormLabel>Slider</FormLabel>
                <FormGroup>
                  <Box sx={{ paddingBlock: 2 }}>
                    <Slider />
                  </Box>
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl>
                <FormLabel>Native</FormLabel>
                <FormGroup>
                  <input type="range" />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <FormLabel>MUI</FormLabel>
                <FormGroup>
                  <MuiSlider />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <WebSocketCard />
      <EditableTable />
      <StackContextDemo />
      <ActivityDemo />
    </Stack>
  );
};
