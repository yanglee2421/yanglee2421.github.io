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
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
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

  const cities = [
    "武汉市",
    "广州市",
    "湛江市",
    "柳州市",
    "怀化市",
    "贵阳市",
    "成都市",
    "杭州市",
    "南京市",
    "徐州市",
    "济南市",
    "潍坊市",
    "淮北市",
    "淮南市",
  ];

  const mapData = cities
    .map((city) => {
      if (cityGeoMap.has(city)) {
        return { name: city, value: 500 };
      }
      return null;
    })
    .filter((item): item is { name: string; value: number } => item !== null);

  const graphaData = cities
    .map((city) => {
      if (cityGeoMap.has(city)) {
        return {
          name: city,
          value: cityGeoMap.get(city),
        };
      }

      return null;
    })
    .filter((item): item is GraphDataItem => {
      if (!item) {
        return false;
      }

      const itemValue = item.value;

      if (!Array.isArray(itemValue)) {
        return false;
      }

      return itemValue.length === 2;
    });

  const edges = cities
    .map((city, index) => {
      const nextCity = cities.at(index + 1);

      if (!nextCity) {
        return null;
      }

      return {
        source: city,
        target: nextCity,
      };
    })
    .filter(
      (item): item is { source: string; target: string } => item !== null,
    );

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
        data: mapData,
      },
      {
        type: "graph",
        coordinateSystem: "geo",
        data: graphaData,
        edges,
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
