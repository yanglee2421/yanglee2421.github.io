<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import * as echarts from "echarts";
import * as Vue from "vue";

const container = Vue.ref<HTMLDivElement | null>(null);

const { data, isPending, isError, isRefetching, isSuccess, error } = useQuery({
  queryKey: ["china-geojson"],
  queryFn: async () => {
    const response = await fetch(
      "https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full_city",
    );
    if (!response.ok) {
      throw new Error("Failed to fetch China GeoJSON");
    }
    return response.json() as Promise<ChinaGeoJSON>;
  },
});

interface ChinaGeoJSON {
  type: "FeatureCollection";
  features: CityFeature[];
}

interface CityFeature {
  type: "Feature";
  properties: {
    name: string;
    center: [number, number];
  };
  geometry: {
    type: "MultiPolygon";
    coordinates: [];
  };
}

interface GraphDataItem {
  name: string;
  value: [number, number];
}

Vue.watchPostEffect(async () => {
  const containerElement = Vue.toValue(container);
  const china = Vue.toValue(data);
  const isLoading = Vue.toValue(isPending);
  const isFailed = Vue.toValue(isError);
  const refetching = Vue.toValue(isRefetching);
  if (!containerElement) return;

  const myChart = echarts.init(containerElement);
  const observer = new ResizeObserver(() => {
    myChart.resize();
  });

  observer.observe(containerElement);

  if (refetching) {
    myChart.showLoading();
  } else {
    myChart.hideLoading();
  }

  if (isLoading) {
    return;
  }

  if (isFailed) {
    // Do Error Handling Here
    return;
  }

  if (!china) {
    // Do Empty State Handling Here
    return;
  }

  echarts.registerMap("china", china);
  // 提取城市坐标映射
  const cityGeoMap = china.features.reduce((map, feature) => {
    map.set(feature.properties.name, feature.properties.center);
    return map;
  }, new Map<string, [number, number]>());
  console.log("所有城市坐标映射:", cityGeoMap);

  const graphaData = [
    {
      name: "武汉市",
      value: cityGeoMap.get("武汉市"),
    },
    {
      name: "广州市",
      value: cityGeoMap.get("广州市"),
    },
  ].filter((item): item is GraphDataItem => {
    const itemValue = item.value;

    if (!Array.isArray(itemValue)) {
      return false;
    }

    return itemValue.length === 2;
  });

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
          { name: "包头市", value: 500 },
          { name: "武汉市", value: 500 },
          { name: "广州市", value: 500 },
        ],
      },
      {
        type: "graph",
        coordinateSystem: "geo",
        data: graphaData,
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
});
</script>

<template>
  <div v-if="isPending" class="fixed inset-0 z-20 grid place-items-center">
    <h1 class="animate-bounce">Loading...</h1>
  </div>
  <div v-else-if="isError" class="fixed inset-0 z-20 grid place-items-center">
    <h1>Error Occurred</h1>
    <p>{{ error?.message }}</p>
  </div>
  <div
    ref="container"
    :aria-hidden="!isSuccess"
    class="fixed inset-0 h-dvh w-dvw aria-hidden:hidden"
  ></div>
</template>

<style scoped></style>
