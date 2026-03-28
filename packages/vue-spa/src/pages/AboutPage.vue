<script lang="ts" setup>
import DashboardLayout from "@/components/DashboardLayout.vue";
import { Teleport } from "vue";

const handlePrint = () => {
  window.print();
};
const date = new Date().toLocaleDateString("zh-CN", {
  dateStyle: "full",
});
</script>

<template>
  <DashboardLayout>
    <button class="btn btn-primary" @click="handlePrint">click me</button>
  </DashboardLayout>
  <Teleport to="body">
    <article id="print" class="hidden text-center text-[10pt]">
      <section class="h-[297mm] w-[210mm] border border-dashed p-10">
        <div class="text-[12pt]">
          <p class="text-end">辆货统-501</p>
          <h1 class="text-[16pt] font-semibold">
            铁路货车轮轴多通道超声波自动探伤系统日常性能校验记录表
          </h1>
          <p>&nbsp;</p>
        </div>
        <table class="w-full table-fixed" cellspacing="0">
          <thead>
            <tr>
              <td colspan="11" class="border-0!">
                <table class="w-full table-fixed">
                  <colgroup>
                    <col class="w-[80pt]" />
                    <col />
                    <col class="w-[80pt]" />
                    <col />
                  </colgroup>
                  <thead>
                    <tr class="text-[12pt]">
                      <th class="border-0!">单位名称</th>
                      <td class="border-0! underline underline-offset-3">
                        江岸车辆段武南轮厂轮轴车间
                      </td>
                      <th class="border-0!">检验时间</th>
                      <td class="border-0! underline underline-offset-3">
                        {{ date }}
                      </td>
                    </tr>
                  </thead>
                </table>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="11" class="">
                <table class="w-full table-fixed">
                  <tbody>
                    <tr class="*:text-[12pt]">
                      <th class="border-y-0! border-l-0!">设备型号</th>
                      <td class="border-y-0!"></td>
                      <th class="border-y-0!">设备编号</th>
                      <td class="border-y-0!"></td>
                      <th class="border-y-0!">实物试块型号</th>
                      <td class="border-y-0! border-r-0!"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <th rowspan="19">R D 2 试 样 轴 轮 座 人 工 缺 陷 编 号</th>
              <th colspan="5">左轮座探头晶片编号及灵敏度</th>
              <th colspan="5">右轮座探头晶片编号及灵敏度</th>
            </tr>
            <tr>
              <th colspan="2">通道编号</th>
              <th>左外</th>
              <th>左内</th>
              <th>左A1(A2)</th>
              <th colspan="2">通道编号</th>
              <th>右外</th>
              <th>右内</th>
              <th>右A1(A2)</th>
            </tr>
            <tr>
              <th colspan="2">折射角（度）</th>
              <th>51</th>
              <th>44</th>
              <th>22.5</th>
              <th colspan="2">折射角（度）</th>
              <th>51</th>
              <th>44</th>
              <th>22.5</th>
            </tr>
            <tr>
              <th rowspan="3">灵敏度（dB）</th>
              <th>校验（80%）</th>
              <td></td>
              <td></td>
              <td></td>
              <th rowspan="3">灵敏度（dB）</th>
              <th>校验（80%）</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>补偿</th>
              <td></td>
              <td></td>
              <td></td>
              <th>补偿</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>探伤</th>
              <td></td>
              <td></td>
              <td></td>
              <th>探伤</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="(item, index) in 13" :key="index">
              <td colspan="2">{{ item }}</td>
              <td></td>
              <td></td>
              <td></td>
              <td colspan="2">{{ item }}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>ss</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="11">
                <table class="w-full table-fixed text-[12pt]">
                  <tr class="*:border-y-0! *:p-1.5">
                    <th rowspan="2" class="border-l-0!">签字签章</th>
                    <th>探伤工</th>
                    <td></td>
                    <th>探伤工长</th>
                    <td class="border-r-0!"></td>
                  </tr>
                  <tr class="*:border-b-0! *:p-1.5">
                    <th>质检员</th>
                    <td></td>
                    <th>验收员</th>
                    <td class="border-r-0!"></td>
                  </tr>
                </table>
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
      <section>
        <h1></h1>
      </section>
    </article>
  </Teleport>
</template>

<style>
@page {
  size: A4;
  margin: 0;
}

section {
  break-after: page;
}

@media print {
  button {
    display: none;
  }
  #app {
    display: none;
  }
  #print {
    display: block;
  }
}

td,
th {
  border: 1pt solid black;
}
</style>
