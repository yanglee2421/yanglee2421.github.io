// React Imports
import React from "react";

// Charts Imports
import ReactApexcharts from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

// MUI Imports
import {
  Card,
  CardHeader,
  CardContent,
  useTheme,
  Typography,
  Box,
  Chip,
  Theme,
} from "@mui/material";
import { ArrowUpwardOutlined } from "@mui/icons-material";
import { green } from "@mui/material/colors";

export function LineChart() {
  const theme = useTheme();

  return (
    <>
      <Card sx={{ m: 4, "& .bar-chart": { padding: theme.spacing(2, 2.5) } }}>
        <CardHeader
          title="Balance"
          subheader="Commercial networks & enterprises"
          sx={{
            flexDirection: ["column", "row"],
            alignItems: ["flex-start", "center"],
            "& .MuiCardHeader-action": { mb: 0 },
            "& .MuiCardHeader-content": { mb: [2, 0] },
          }}
          action={
            <Box display={"flex"} alignItems={"center"}>
              <Typography variant="h6" marginRight={5}>
                $221,267
              </Typography>
              <Chip
                color="success"
                variant="filled"
                label={
                  <Box
                    display={"flex"}
                    alignSelf={"center"}
                    sx={{
                      "& svg": { mr: 1 },
                    }}
                  >
                    <ArrowUpwardOutlined fontSize="small" />
                    <span>22%</span>
                  </Box>
                }
                sx={{
                  fontWeight: 500,
                  borderRadius: 1,
                  fontSize: "0.875rem",
                }}
              />
            </Box>
          }
        />
        <CardContent>
          <ReactApexcharts
            type="line"
            height={400}
            series={series()}
            options={options(theme)}
          />
        </CardContent>
      </Card>
    </>
  );
}

function series(): ApexOptions["series"] {
  return [
    {
      data: [
        280, 200, 220, 180, 270, 250, 70, 90, 200, 150, 160, 100, 150, 100, 50,
      ],
    },
    {
      data: [
        120, 500, 320, 89, 159, 170, 170, 190, 100, 140, 250, 100, 159, 120,
        150,
      ],
    },
  ];
}

function options(theme: Theme): ApexOptions {
  return {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    colors: ["#ff9f43", green[500]],
    stroke: { curve: "straight" },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ["#ff9f43"],
      strokeColors: ["#fff", "#eee"],
    },
    grid: {
      padding: { top: -10 },
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true },
      },
    },
    tooltip: {
      custom(data: any) {
        return `<div class='bar-chart'>
                <span>${
                  data.series[data.seriesIndex][data.dataPointIndex]
                }%</span>
              </div>`;
      },
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled },
      },
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: {
        stroke: { color: theme.palette.divider },
      },
      labels: {
        style: { colors: theme.palette.text.disabled },
      },
      categories: [
        "2023-7/12",
        "2023-8/12",
        "2023-9/12",
        "2023-10/12",
        "2023-11/12",
        "2023-12/12",
        "2023-13/12",
        "2023-14/12",
        "2023-15/12",
        "2023-16/12",
        "2023-17/12",
        "2023-18/12",
        "2023-19/12",
        "2023-20/12",
        "2023-21/12",
      ],
    },
  };
}
