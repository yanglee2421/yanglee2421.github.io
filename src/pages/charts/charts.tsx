// React Imports
// import React from "react";

// Components Imports
import ReactApexcharts from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

// MUI Imports
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Theme,
  useTheme,
  styled,
  Stack,
} from "@mui/material";
import { ArrowUpwardOutlined } from "@mui/icons-material";
import { green } from "@mui/material/colors";

import { useImmer } from "use-immer";

export function Charts() {
  const theme = useTheme();

  const data = {
    global: [
      {
        feature: "product_type",
        data: {
          bath: 2,
          cardigan: 4,
          desk: 1,
          jacket: 1,
          jumper: 8,
          pullover: 4,
          sweater: 12,
          sweatshirt: 1,
          top: 1,
        },
      },
      {
        feature: "product_category",
        data: {
          "5": 7,
          NORMAL: 31,
        },
      },
    ],
    sweater: [
      {
        feature: "pattern",
        data: {
          "light color": 9,
          "solid color": 7,
        },
      },
      {
        feature: "sleeve_length",
        data: {
          long: 2,
          middle: 5,
          short: 9,
        },
      },
      {
        feature: "thickness",
        data: {
          thick: 4,
          thicker: 6,
          thickest: 6,
        },
      },
      {
        feature: "color",
        data: {
          black: 4,
          blue: 5,
          green: 7,
        },
      },
      {
        feature: "size",
        data: {
          L: 6,
          M: 4,
          XL: 6,
        },
      },
    ],
  };

  const options = Object.keys(
    Object(
      data.global.find((item) => {
        return item.feature === "product_type";
      })?.data
    )
  ).filter((item) => {
    return Object.keys(data).includes(item);
  });

  const [state, updateState] = useImmer(() => {
    return {
      productType: options.at(0) || "sweater",
    };
  });

  void updateState;

  const selectedFeature: (typeof data)[keyof typeof data] = Reflect.get(
    data,
    state.productType
  );

  const filteredFeature = selectedFeature.filter((item) => {
    return Object.keys(item.data).length > 2;
  });

  const list: Record<string, number>[] = [];

  for (let i = 0; i < 3; i++) {
    const map = filteredFeature.reduce<Map<string, number>>((map, item) => {
      const tuple = Object.entries(item.data)
        .sort((prev, curr) => {
          return curr[1] - prev[1];
        })
        .at(i);

      if (tuple) {
        map.set(tuple[0], tuple[1]);
      }

      return map;
    }, new Map());

    list.push(Object.fromEntries(map.entries()));
  }

  return (
    <Stack spacing={6}>
      <StyledCard>
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
            options={getOptions(theme)}
          />
        </CardContent>
      </StyledCard>
      <Card>
        <CardContent>
          <ReactApexcharts
            type="radar"
            height={500}
            series={list.map((item) => {
              return {
                name: Object.keys(item).join("/"),
                data: Object.values(item),
              };
            })}
            options={{
              chart: {
                parentHeightOffset: 0,
                toolbar: { show: false },
                dropShadow: {
                  top: 1,
                  blur: 8,
                  left: 1,
                  opacity: 0.2,
                  enabled: false,
                },
              },
              markers: { size: 0 },
              tooltip: {
                marker: {
                  show: true,
                },
                // custom(options) {
                //   return void options;
                // },
              },
              fill: { opacity: 0.1 },
              stroke: {
                width: 2,
                show: true,
              },
              dataLabels: { enabled: true },
              legend: {
                labels: {
                  colors: theme.palette.text.secondary,
                },
                markers: {
                  offsetX: -3,
                },
                itemMargin: {
                  vertical: 3,
                  horizontal: 10,
                },
              },
              plotOptions: {
                radar: {
                  polygons: {
                    strokeColors: theme.palette.divider,
                    connectorColors: theme.palette.divider,
                  },
                },
              },
              grid: {
                show: false,
                padding: {
                  top: -20,
                  bottom: -20,
                },
              },
              yaxis: { show: false },
              xaxis: {
                categories: filteredFeature.map((item) => item.feature),
                labels: {
                  style: {
                    colors: theme.palette.text.disabled,
                  },
                },
              },
            }}
          ></ReactApexcharts>
        </CardContent>
      </Card>
    </Stack>
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

function getOptions(theme: Theme): ApexOptions {
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
      colors: ["#ff9f43", green[500]],
      strokeColors: "#fff",
    },
    grid: {
      padding: { top: -10 },
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true },
      },
    },
    tooltip: {
      // custom(data) {
      //   return `<div class='bar-chart'>
      //         <span>${
      //           data.series[data.seriesIndex][data.dataPointIndex]
      //         }%</span>
      //       </div>`;
      // },
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
    legend: {
      labels: {
        colors: theme.palette.text.primary,
      },
    },
  };
}

const StyledCard = styled(Card)(({ theme }) => {
  return {
    "& .apexcharts-canvas": {
      "& line[stroke='transparent']": {
        display: "none",
      },
      "& .apexcharts-tooltip": {
        boxShadow: theme.shadows[3],
        borderColor: theme.palette.divider,
        background: theme.palette.background.paper,
        "& .apexcharts-tooltip-title": {
          fontWeight: 600,
          borderColor: theme.palette.divider,
          background: theme.palette.background.paper,
        },
        "&.apexcharts-theme-light": {
          color: theme.palette.text.primary,
        },
        "&.apexcharts-theme-dark": {
          color: theme.palette.common.white,
        },
        "& .apexcharts-tooltip-series-group:first-of-type": {
          paddingBottom: 0,
        },
      },
      "& .apexcharts-xaxistooltip": {
        borderColor: theme.palette.divider,
        background:
          theme.palette.mode === "light"
            ? theme.palette.grey[50]
            : theme.palette.background.default,
        "&:after": {
          borderBottomColor:
            theme.palette.mode === "light"
              ? theme.palette.grey[50]
              : theme.palette.background.default,
        },
        "&:before": {
          borderBottomColor: theme.palette.divider,
        },
      },
      "& .apexcharts-yaxistooltip": {
        borderColor: theme.palette.divider,
        background:
          theme.palette.mode === "light"
            ? theme.palette.grey[50]
            : theme.palette.background.default,
        "&:after": {
          borderLeftColor:
            theme.palette.mode === "light"
              ? theme.palette.grey[50]
              : theme.palette.background.default,
        },
        "&:before": {
          borderLeftColor: theme.palette.divider,
        },
      },
      "& .apexcharts-xaxistooltip-text, & .apexcharts-yaxistooltip-text": {
        color: theme.palette.text.primary,
      },
      "& .apexcharts-yaxis .apexcharts-yaxis-texts-g .apexcharts-yaxis-label": {
        textAnchor: theme.direction === "rtl" ? "start" : void 0,
      },
      "& .apexcharts-text, & .apexcharts-tooltip-text, & .apexcharts-datalabel-label, & .apexcharts-datalabel, & .apexcharts-xaxistooltip-text, & .apexcharts-yaxistooltip-text, & .apexcharts-legend-text":
        {
          fontFamily: `${theme.typography.fontFamily} !important`,
        },
      "& .apexcharts-pie-label": {
        filter: "none",
        fill: theme.palette.common.white,
      },
      "& .apexcharts-marker": {
        boxShadow: "none",
      },
    },
  };
});
