<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <yy-card title="饼图">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </yy-card>
      </el-col>
      <el-col :span="10">
        <yy-card title="销量">
          <map-echart :map-data="addressGoodsSale"></map-echart>
        </yy-card>
      </el-col>
      <el-col :span="7">
        <yy-card title="玫瑰图">
          <rose-echart :rose-data="categoryGoodsCount"></rose-echart>
        </yy-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <yy-card title="销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </yy-card>
      </el-col>
      <el-col :span="12">
        <yy-card title="收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </yy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import yyCard from '@/base-ui/card';
import { BarEchart, LineEchart, MapEchart, PieEchart, RoseEchart } from '@/components/page-echarts';
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'dashboard',
  components:{
    yyCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch('dashboard/getDashboardDataAction')
    // 获取数据
    const categoryGoodsCount = computed(()=>{
      return store.state.dashboard.categoryGoodsCount.map((item:any)=>{
        return {name:item.name,value:item.goodsCount}
      })
    })
    const categoryGoodsSale = computed(()=>{
      const xLabels:string[]=[]
      const values:any[]=[]
      const categoryGoodsSale=store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return {xLabels,values}
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        // console.log('{ xLabels, values }',item);
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item:any)=>{
        return {name:item.address,value:item.count}
      })

    })
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
  .content-row{
    margin-top: 20px;
  }
</style>
