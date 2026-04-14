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
    <article id="print" class="hidden">
      <section data-a4>
        <p class="text-end text-[12pt]">辆货统-501</p>
        <h1 data-caption>
          铁路货车轮轴多通道超声波自动探伤系统日常性能校验记录表
        </h1>
        <p>&nbsp;</p>
        <table cellspacing="0">
          <colgroup>
            <col class="w-[80pt]" />
            <col />
            <col class="w-[80pt]" />
            <col />
          </colgroup>
          <thead>
            <tr class="text-[12pt]">
              <th>单位名称</th>
              <td class="underline underline-offset-3">
                江岸车辆段武南轮厂轮轴车间
              </td>
              <th class="">检验时间</th>
              <td class="underline underline-offset-3">
                {{ date }}
              </td>
            </tr>
          </thead>
        </table>
        <table cellspacing="0">
          <thead>
            <tr>
              <td colspan="11">
                <table cellspacing="0">
                  <tbody>
                    <tr class="*:text-[12pt]">
                      <th>设备型号</th>
                      <td></td>
                      <th>设备编号</th>
                      <td></td>
                      <th>实物试块型号</th>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th rowspan="20">
                R
                <br />
                D <br />
                2 <br />试 <br />
                样 <br />
                轴 <br />
                轮 <br />
                座 <br />
                人 <br />
                工 <br />
                缺 <br />
                陷 <br />
                编 <br />
                号
              </th>
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
            <tr v-for="(item, index) in 13" :key="index" class="*:text-[12pt]">
              <th colspan="2">{{ item }}</th>
              <td></td>
              <td></td>
              <td></td>
              <th colspan="2">{{ item }}</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-if="true">
              <td colspan="5">
                <table cellspacing="0">
                  <tbody>
                    <tr>
                      <th rowspan="2">左</th>
                      <th rowspan="2">通道编号</th>
                      <th rowspan="2">拆射角度</th>
                      <th colspan="3">灵敏度(dB)</th>
                      <th colspan="3">缺陷编号</th>
                    </tr>
                    <tr>
                      <th>
                        校验
                        <br />
                        (80%)
                      </th>
                      <th>补偿</th>
                      <th>探伤</th>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                    </tr>
                    <tr>
                      <th rowspan="3" class="text-[12pt]">
                        轴
                        <br />
                        颈
                      </th>
                      <th>CT</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td colspan="3"></td>
                    </tr>
                    <tr>
                      <th>A1</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>A2</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td colspan="5">
                <table cellspacing="0">
                  <tbody>
                    <tr>
                      <th rowspan="2">右</th>
                      <th rowspan="2">通道编号</th>
                      <th rowspan="2">拆射角度</th>
                      <th colspan="3">灵敏度(dB)</th>
                      <th colspan="3">缺陷编号</th>
                    </tr>
                    <tr>
                      <th>
                        校验
                        <br />
                        (80%)
                      </th>
                      <th>补偿</th>
                      <th>探伤</th>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                    </tr>
                    <tr>
                      <th rowspan="3" class="text-[12pt]">
                        轴
                        <br />
                        颈
                      </th>
                      <th>CT</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td colspan="3"></td>
                    </tr>
                    <tr>
                      <th>A1</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>A2</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="11">
                <table class="text-[12pt]" cellspacing="0">
                  <tbody>
                    <tr>
                      <th rowspan="2">签字签章</th>
                      <th>探伤工</th>
                      <td></td>
                      <th>探伤工长</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th>质检员</th>
                      <td></td>
                      <th>验收员</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th>备注</th>
                      <td colspan="4"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tfoot>
        </table>
        <p class="mt-6 text-end text-[12pt]">第 1 页</p>
      </section>
      <section data-a4>
        <p class="text-end text-[12pt]">辆货统-501</p>
        <h1 data-caption="">
          铁路货车轮轴超声波自动探伤系统日常性能校验记录表（第2页）
        </h1>
        <p>&nbsp;</p>
        <table cellspacing="0" class="text-[12pt]">
          <colgroup>
            <col class="w-[80pt]" />
            <col />
            <col class="w-[80pt]" />
            <col />
          </colgroup>
          <thead>
            <tr class="text-[12pt]">
              <th>样板轮型号</th>
              <td class="underline underline-offset-3">
                江岸车辆段武南轮厂轮轴车间
              </td>
              <th class="">校验时间</th>
              <td class="underline underline-offset-3">
                {{ date }}
              </td>
            </tr>
          </thead>
        </table>
        <table cellspacing="0">
          <tbody>
            <tr>
              <td class="p-0! text-[12pt]">左轴颈根部扫描图</td>
              <td class="p-0! text-[12pt]">右轴颈根部扫描图</td>
            </tr>
            <tr>
              <td class="h-[150pt] p-0!"></td>
              <td class="h-[150pt] p-0!"></td>
            </tr>
            <tr>
              <td class="p-0! text-[12pt]">左轴颈根部扫描图</td>
              <td class="p-0! text-[12pt]">右轴颈根部扫描图</td>
            </tr>
            <tr>
              <td class="h-[150pt] p-0!"></td>
              <td class="h-[150pt] p-0!"></td>
            </tr>
            <tr>
              <td colspan="2" class="p-0! text-[12pt]">左穿透扫描图</td>
            </tr>
            <tr>
              <td colspan="2" class="h-[150pt] p-0!"></td>
            </tr>
            <tr>
              <td colspan="2" class="p-0! text-[12pt]">右穿透扫描图</td>
            </tr>
            <tr>
              <td colspan="2" class="h-[150pt] p-0!"></td>
            </tr>
          </tbody>
        </table>
        <p class="mt-6 text-end text-[12pt]">第 2 页</p>
      </section>
    </article>
  </Teleport>
</template>

<style>
[data-a4] {
  box-sizing: border-box;
  width: 210mm;
  height: 297mm;

  padding: 16mm 14mm;
  margin: 0;

  border: 1px dashed black;

  break-after: page;

  font-family: "SimSun", "宋体", serif;
  font-size: 10pt;

  text-align: center;

  &::before,
  &::after {
    content: "";
    display: table;
    clear: both;
  }

  table {
    width: 100%;
    border-collapse: separate;
    table-layout: fixed;
  }
}

[data-caption] {
  font-size: 16pt;
  font-weight: 600;
}

table {
  > thead {
    > tr {
      > td,
      > th {
        > table {
          > tbody {
            > tr {
              > td,
              > th {
                padding: 3pt;
              }
            }
          }
        }
      }
    }
  }
  > tbody {
    > tr {
      > td,
      > th {
        padding: 2pt;

        border: solid black;
        border-width: 1pt 1pt 0 0;

        &:has(> table) {
          padding: 0;
          border: 0;
        }

        > table {
          td,
          th {
            padding: 2pt;
          }
        }
      }
    }
  }
  > tfoot {
    > tr {
      > td,
      > th {
        > table {
          > tbody {
            > tr {
              > td,
              > th {
                padding: 3pt;
              }
            }
          }
        }
      }
    }
  }
}

table:has(tbody) {
  border: solid black;
  border-width: 0 0 1pt 1pt;
}

@page {
  size: A4 portrait;
  margin: 0;
}

@media print {
  #app {
    display: none;
  }
  #print {
    display: block;
  }
  [data-a4] {
    /* border: 0; */
  }
}
td > table {
  border: 0;
}
</style>
