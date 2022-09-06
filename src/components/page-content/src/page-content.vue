<template>
  <div class="page-content">
        <yy-table :listData="dataList" :listCount="dataCount" v-bind="contentTableConfig" v-model:page="pageInfo">
          <template #headerHandler>
            <el-button type="primary" v-if="isCreate" @click="handleNewClick">新建用户</el-button>
            <el-button >刷新</el-button>
          </template>
          <!-- 列 -->
          <template #status="scope">
            <el-button size="small" :type="scope.row.enable ? 'success':'danger'">{{scope.row.enable ? '启动' : '禁用'}}</el-button>
          </template>
          <template #createAt="scope">
            {{$filter.formatTime(scope.row.createAt)}}
          </template>
          <template #updateAt="scope">
            {{$filter.formatTime(scope.row.updateAt)}}
          </template>
            <template #handler="scope">
            <div class="handle-btns">
              <el-button size="small" type="primary" link v-if="isUpdate" @click="handleEditClick(scope.row)">编辑</el-button>
              <el-button size="small" type="primary" link v-if="isDelete" @click="handleDeleteClick(scope.row)">删除</el-button>
            </div>
          </template>
          <!-- 动态插入剩余插槽 -->
          <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
            <template v-if="item.slotName">
              <slot :name="item.slotName" :row="scope.row"></slot>
            </template>
          </template>
        </yy-table>
  </div>
</template>

<script lang="ts">

import yyTable from '@/base-ui/table';
import { usePermission } from '@/hook/usePermission';
import { useStore } from '@/store';
import { computed, defineComponent, ref, watch } from 'vue';
export default defineComponent({
  name:'page-content',
  props:{
    contentTableConfig:{
      type:Object,
      require:true
    },
    pageName:{
      type:String,
      require:true
    }
  },
  components:{
    yyTable
  },
  emits:['newBtnClick','editBtnClick'],
  setup(props,{emit}) {
    const store=useStore()
    const isCreate=usePermission((props.pageName as string),'create')
    const isUpdate=usePermission((props.pageName as string),'update')
    const isDelete=usePermission((props.pageName as string),'delete')
    const isQuery=usePermission((props.pageName as string),'query')
    const pageInfo=ref({currentPage:1,pageSize:10})
    watch(pageInfo,()=>getPageData())
    // 发送网络请求
    const getPageData=(queryInfo:any={})=>{
      if(!isQuery) return
      console.log('queryInfo',queryInfo);
      store.dispatch('system/getPageListAction',{
      pageName:props.pageName,
      queryInfo:{
        offset:(pageInfo.value.currentPage -1 )*pageInfo.value.pageSize,
        size:pageInfo.value.pageSize,
        ...queryInfo
      }
    }
    )
    }
    getPageData()
    const dataList=computed(()=>{
      return store.getters[`system/pageListData`](props.pageName)
   })
   const dataCount=computed(()=>{
    return store.getters[`system/pageListCount`](props.pageName)
   })

  //  4.获取其他的动态插槽
  const otherPropSlots=props.contentTableConfig?.propList.filter((item:any)=>{
    if(item.slotName==='status') return false
    if(item.slotName==='createAt') return false
    if(item.slotName==='updateAt') return false
    if(item.slotName==='handler') return false
    return true
  })

  // 5.删除/编辑/新建
  const handleDeleteClick=(item:any)=>{
    console.log('item',item);
    store.dispatch('system/deletePageDataAction',{
      pageName:props.pageName,
      id:item.id
    })
  }
  const handleNewClick=()=>{
    emit('newBtnClick')
  }
  const handleEditClick=(item:any)=>{
    emit('editBtnClick',item)
  }

   return {
    dataList,
    dataCount,
    pageInfo,
    otherPropSlots,
    isCreate,
    isUpdate,
    isDelete,
    isQuery,
    getPageData,
    handleDeleteClick,
    handleNewClick,
    handleEditClick
   }
  }

})
</script>

<style scoped>
  .content{
    padding:20px;
    border-top: 20px solid #f5f5f5;
  }
</style>
