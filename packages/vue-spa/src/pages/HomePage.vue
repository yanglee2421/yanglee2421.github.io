<script lang="ts" setup>
import * as echarts from "echarts";
import * as Vue from "vue";

const container = Vue.ref<HTMLDivElement | null>(null);

Vue.onMounted(async () => {
  const containerElement = container.value;
  if (!containerElement) return;

  const china = await fetch(
    "https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full_city",
  ).then((res) => res.json());

  // 提取城市坐标映射
  const cityGeoMap: Record<string, number[]> = {};
  china.features.forEach((feature: any) => {
    if (feature.properties && feature.properties.center) {
      cityGeoMap[feature.properties.name] = feature.properties.center;
    }
  });
  console.log("所有城市坐标映射:", cityGeoMap);

  echarts.registerMap("china", china);
  const myChart = echarts.init(containerElement);

  myChart.setOption({
    geo: {
      map: "china",
      roam: true,
      label: {
        show: true,
        color: "#000",
      },
    },
    visualMap: [
      {
        orient: "horizontal",
        calculable: true,
        right: 0,
        bottom: 0,
        seriesIndex: 0,
        // min/max is specified as series.data value extent.
        min: 0,
        max: 1e5,
        dimension: 2,
        inRange: {
          symbolSize: [0, 1],
        },
        controller: {
          inRange: {
            color: ["#66c2a5"],
          },
        },
        show: false,
      },
      {
        orient: "horizontal",
        calculable: true,
        left: 0,
        bottom: 0,
        seriesIndex: 1,
        // min/max is specified as series.data value extent.
        min: 0,
        max: 500,
        dimension: 0,
        inRange: {
          color: ["#deebf7", "#3182bd"],
        },
        show: false,
      },
    ],
    series: [
      { type: "scatter", coordinateSystem: "geo" },
      {
        type: "map",
        map: "china",
        geoIndex: 0,
        data: [
          {
            name: "包头市",
            value: 423,
          },
          {
            name: "武汉市",
            value: 256,
          },
          { name: "广州市", value: 489 },
        ],
      },
      {
        type: "graph",
        coordinateSystem: "geo",
        data: [
          { name: "包头市", value: cityGeoMap["包头市"] },
          { name: "武汉市", value: cityGeoMap["武汉市"] },
          { name: "广州市", value: cityGeoMap["广州市"] },
        ],
        edges: [
          {
            source: "包头市",
            target: "武汉市",
          },
          {
            source: "武汉市",
            target: "广州市",
          },
        ],
        edgeSymbol: ["none", "arrow"],
        edgeSymbolSize: 5,
        lineStyle: {
          color: "#ff0000",
          opacity: 1,
          curveness: 0.3,
        },
        itemStyle: {
          color: "#ff0000",
        },
      },
    ],
  });

  myChart.resize();
});
</script>

<template>
  <div ref="container" class="fixed inset-0 h-dvh w-dvw"></div>
</template>

<style scoped></style>
