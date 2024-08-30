import React from "react";
import ReactApexChart from "react-apexcharts";
import { AnimateController } from "@/libs/AnimateController";
import { Realtime } from "./Realtime";
import { Recharts } from "./Recharts";

export function Charts() {
  React.useEffect(() => {
    let updateAt = performance.now();
    const animateController = new AnimateController(() => {
      const now = performance.now();

      if (now - updateAt > 999) {
        updateAt = now;

        realtime.update();

        ApexCharts.exec("realtime", "updateSeries", [
          {
            data: realtime.data,
          },
        ]);
      }
    });

    animateController.play();

    return () => {
      animateController.abort();
    };
  }, []);

  return (
    <>
      <ReactApexChart
        options={{
          chart: {
            id: "realtime",
            type: "line",
            animations: {
              easing: "linear",
              dynamicAnimation: {
                speed: 1000,
              },
            },
            toolbar: {
              show: false,
            },
            zoom: { enabled: false },
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
            range: realtime.range,
            labels: {
              // show: false,
            },
            tooltip: { enabled: false },
          },
          yaxis: {
            max: 100,
            show: false,
            stepSize: 25,
            tooltip: { enabled: false },
          },
          tooltip: {
            enabled: false,
          },
        }}
        series={[
          {
            data: realtime.data.slice(),
          },
        ]}
        type="line"
        height={350}
      />
      <Recharts />
    </>
  );
}

const realtime = new Realtime();
