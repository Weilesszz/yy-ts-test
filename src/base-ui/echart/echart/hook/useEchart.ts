import * as echarts from 'echarts';
import chinaMapData from '../data/china.json';
echarts.registerMap('china', chinaMapData)
export default function(el:HTMLElement) {
  const echartInstance=echarts.init(el)
  const setOptions=(options:echarts.EChartsOption)=>{
    echartInstance.setOption(options)
  }
  const updateSize=()=>{
    echartInstance.resize()
  }
  window.addEventListener('resize',()=>{
    echartInstance.resize()
  })
// 不一定用完。数组：全都用完
  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
