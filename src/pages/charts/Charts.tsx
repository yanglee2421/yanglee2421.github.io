import { Container, Grid, Paper } from "@mui/material";
import React from "react";
import ReactApexCharts from "react-apexcharts";
import { AnimateController } from "@/utils/AnimateController";

const begin = Date.now();

export function Charts() {
  const [data, setData] = React.useState([
    {
      y: 10,
      x: begin,
    },
    {
      y: 41,
      x: begin + 1000,
    },
    {
      y: 35,
      x: begin + 1000 * 2,
    },
    {
      y: 51,
      x: begin + 1000 * 3,
    },
    {
      y: 49,
      x: begin + 1000 * 4,
    },
    {
      y: 62,
      x: begin + 1000 * 5,
    },
    {
      y: 69,
      x: begin + 1000 * 6,
    },
    {
      y: 91,
      x: begin + 1000 * 7,
    },
    {
      y: 48,
      x: begin + 1000 * 8,
    },
  ]);

  React.useEffect(() => {
    let updateAt = performance.now();

    const controller = new AnimateController(() => {
      const nowTime = performance.now();
      if (nowTime - 1000 < updateAt) {
        return;
      }

      updateAt = nowTime;

      React.startTransition(() => {
        setData((prev) => {
          const newList = prev.slice();
          newList.push({
            y: Math.floor(Math.random() * 100),
            x: updateAt,
          });
          return newList.slice(1);
        });
      });
    });

    controller.play();

    return () => {
      controller.abort();
    };
  }, [setData]);

  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Paper>
            <ReactApexCharts
              options={{
                chart: {
                  height: 350,
                  type: "line",
                  zoom: {
                    enabled: false,
                  },
                  animations: {
                    enabled: true,
                    easing: "linear",
                    dynamicAnimation: {
                      speed: 1000,
                    },
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "smooth",
                },
                title: {
                  text: "Product Trends by Month",
                  align: "left",
                },
                grid: {
                  row: {
                    colors: ["#f3f3f3", "transparent"],
                    opacity: 0.5,
                  },
                },
                xaxis: {
                  type: "datetime",
                  categories: data.map((item) =>
                    new Date(item.x).toLocaleString(),
                  ),
                },
                yaxis: {
                  max: 100,
                },
              }}
              series={[
                {
                  name: "Desktops",
                  data: data.map((item) => item.y),
                },
              ]}
              type="line"
              height={420}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper>62131531</Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
