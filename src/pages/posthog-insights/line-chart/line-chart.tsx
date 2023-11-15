// Charts Imports
import ReactApexcharts from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

// MUI Imports
import { useTheme, Theme } from "@mui/material";
import { green, blue, purple } from "@mui/material/colors";

export function LineChart(props: LineChartProps) {
  // ** Props
  const { categories, series, ...restProps } = props;

  const theme = useTheme();

  return (
    <>
      <ReactApexcharts
        type="line"
        height={400}
        series={series}
        options={options({ theme, categories })}
        {...restProps}
      />
    </>
  );
}

function options(options: Options): ApexOptions {
  // ** Params
  const { categories, theme } = options;

  return {
    chart: {
      parentHeightOffset: 0,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#ff9f43", green[500], blue[500], purple[400]],
    stroke: {
      curve: "straight",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ["#ff9f43", green[500], blue[500], purple[400]],
      strokeColors: "#fff",
    },
    grid: {
      padding: {
        top: -10,
      },
      borderColor: theme.palette.divider,
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.disabled,
        },
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        color: theme.palette.divider,
      },
      crosshairs: {
        stroke: {
          color: theme.palette.divider,
        },
      },
      labels: {
        style: {
          colors: theme.palette.text.disabled,
        },
      },
      categories,
    },
    legend: {
      labels: {
        colors: theme.palette.text.primary,
      },
    },
  };
}

interface Options {
  theme: Theme;
  categories: string[];
}

interface LineChartProps {
  categories: string[];
  series: ApexOptions["series"];
}
