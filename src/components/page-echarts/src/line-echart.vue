<template>
  <div class="line-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import BaseEchart from '@/base-ui/echart';
import { computed, defineProps, withDefaults } from 'vue';

const props = withDefaults(
  defineProps<{
    title?: string
    xLabels: string[]
    values: any[]
  }>(),
  {
    title: ''
  }
)

const options = computed(() => {
  return {
    title: {
      text: props.title
    },
    tooltip: {
      trigger: ('axis' as const),
      axisPointer: {
        type: ('cross' as const),
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {},
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: ('category' as const),
        boundaryGap: false,
        data: props.xLabels
      }
    ],
    yAxis: [
      {
        type: ('value' as const)
      }
    ],
    series: [
      {
        name: '分别销量',
        type: ('line' as const),
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: ('series' as const)
        },
        data: props.values
      }
    ]
  }
})
</script>

<style scoped></style>
