<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content :contentTableConfig="contentTableConfig" pageName="role" @newBtnClick="handleNewData" @editBtnClick="handleEditData"></page-content>
    <page-modal ref="pageModalRef" :defaultInfo="defaultInfo" :modalConfig="modalConfig" :otherInfo="otherInfo" pageName="role">
      <div class="menu-tree">
        <el-tree
        ref="elTreeRef"
    :data="menus"
    show-checkbox
    node-key="id"
    :props="{children:'children',label:'name'}"
    @check="handleCheckChange"
  />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import PageContent from '@/components/page-content/src/page-content.vue';
import PageModal from '@/components/page-modal/';
import PageSearch from '@/components/page-search/src/page-search.vue';
import { usePageModal } from '@/hook/usePageModal';
import { useStore } from '@/store';
import { getMapMenuLeafKeys } from '@/utils/map-menus';
import { ElTree } from 'element-plus/lib/index';
import { computed, defineComponent, nextTick, ref } from 'vue';
import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';
import { searchFormConfig } from './config/search.config';
export default defineComponent({
  name: 'role',
  components:{
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    // 处理pagemodal的hoook
    const elTreeRef=ref<InstanceType<typeof ElTree>>(null)
    const editCallback=(item:any):void=>{
      // console.log('editCallback',{...item});
      const leafKeys=getMapMenuLeafKeys(item.menuList)
      nextTick(()=>{
        elTreeRef.value?.setCheckedKeys(leafKeys,false)
      })
    }

    const [pageModalRef,defaultInfo,handleNewData,handleEditData]= usePageModal(undefined,editCallback) as any
    const store=useStore()
    const menus=computed(()=>store.state.entireMenu)
    const otherInfo=ref({})
    const handleCheckChange=(data1:any,data2:any)=>{
      const checkedKeys=data2.checkedKeys
      const halfCheckedKeys=data2.halfCheckedKeys
      const menuList=[...checkedKeys,...halfCheckedKeys]
      otherInfo.value={menuList}
    }
    return {
      contentTableConfig,
      searchFormConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      otherInfo,
      menus,
      elTreeRef,
      handleNewData,
      handleEditData,
      handleCheckChange,
    }
  }
})
</script>

<style scoped lang="less">
  .menu-tree{
    margin-left: 20px;
  }
</style>
