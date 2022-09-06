<template>
  <div>
    <BaseEchart :options="options"></BaseEchart>
  </div>
</template>

<script lang="ts" setup>
import BaseEchart from '@/base-ui/echart';
import { computed, defineProps } from 'vue';
import { IDataType } from '../types';
const props=defineProps<{
  pieData:IDataType[]
}>()
const options = computed(() => {
  return {
    tooltip: {
      trigger: ('item' as const)
    },
    legend: {
      orient: ('horizontal' as const),
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: ('pie' as const),
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped>

</style>
