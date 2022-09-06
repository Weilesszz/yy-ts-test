<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{width:width,height:height}">
    </div>
  </div>
</template>

<script lang="ts" setup>
  import * as echarts from 'echarts';
import { defineProps, onMounted, ref, watchEffect, withDefaults } from 'vue';
import useEchart from '../echart/hook/useEchart';
const props = withDefaults(defineProps<{
  options:echarts.EChartsOption
  width?:string,
  height?:string
}>(),{
  width:'100%',
  height:'360px'
})


  const echartDivRef=ref<HTMLElement>(null)
    onMounted(()=>{
      const {setOptions}=useEchart(echartDivRef.value!)
      // const echartInstance=echarts.init(echartDivRef.value!)
      watchEffect(()=>{
        setOptions(props.options)
      })
    })

</script>

<style scoped lang="less">
</style>
