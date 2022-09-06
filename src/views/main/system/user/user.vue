<template>
  <div class="user">
      <PageSearch :searchFormConfig="searchFormConfig" @resetBtnClick="handleResetClick" @queryBtnClick="handleQueryClick"></PageSearch>
      <PageContent ref="pageContentRef" :contentTableConfig="contentTableConfig" :pageName="pageName" @newBtnClick="handleNewData" @editBtnClick="handleEditData"></PageContent>
      <pageModal ref="pageModalRef" :modalConfig="modalConfigRef" :defaultInfo="defaultInfo" pageName="users"></pageModal>

  </div>
</template>

<script lang="ts">

import PageContent from '@/components/page-content';
import pageModal from '@/components/page-modal/';
import PageSearch from '@/components/page-search';
import { usePageModal } from '@/hook/usePageModal';
import { usePageSearch } from '@/hook/usePageSearch';
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";
import { searchFormConfig } from "./config/search.config";
export default defineComponent({
  name: 'user',
  components:{
    PageSearch,
    PageContent,
    pageModal
  },
  setup() {
    const pageName='users'
    const store=useStore()
    const modalConfigRef=computed(()=>{
      // 类似create 所以不一定能即时拿到数据，需要副作用函数
    const departmentItem=modalConfig.formItem.find(item=>item.field==='departmentId')
    departmentItem!.options=store.state.entireDepartment.map(item=>{
      return {title:item.name,value:item.id}
    })
    const roleItem=modalConfig.formItem.find(item=>item.field==='roleId')
    roleItem!.options=store.state.entireRole.map(item=>{
      return {title:item.name,value:item.id}
    })
      return modalConfig
    })
    const [pageContentRef,handleResetClick,handleQueryClick] = usePageSearch()
    // pageModal相关
    const newCallback=()=>{
      const passwordItem=modalConfig.formItem.find((item)=>item.field==='password')
      passwordItem!.isHidden= false
    }
    const editCallback=()=>{
      const passwordItem=modalConfig.formItem.find((item)=>item.field==='password')
      passwordItem!.isHidden= true
    }


    const [pageModalRef,defaultInfo,handleNewData,handleEditData]=usePageModal(newCallback,editCallback) as any
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      pageName,
      defaultInfo,
      pageContentRef,
      pageModalRef,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData
    }
    }
})
</script>

<style scoped>

</style>
