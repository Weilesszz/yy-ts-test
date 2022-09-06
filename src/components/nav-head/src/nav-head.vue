<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <Fold v-if="isFold" />
      <Expand v-else />
    </el-icon>
   <div class="content">
    <nav-breadcrumb :breadcrumbs="breadcrumbs"></nav-breadcrumb>
    <UserInfo />
   </div>
  </div>
</template>

<script lang="ts">

import NavBreadcrumb from "@/base-ui/breadcrumb";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import UserInfo from "./user-info.vue";
export default defineComponent({
  emits:['foldChange'],
  components:{
    UserInfo,
    NavBreadcrumb
  },
  setup(props,{emit}) {
    const isFold=ref(false)
    const handleFoldClick=()=>{
      isFold.value=!isFold.value
      emit('foldChange',isFold.value)
    }
    const store=useStore()


    // 面包屑
    const breadcrumbs=computed(()=>{
      const userMenus=store.state.login.userMenus
      const route=useRoute()
      const currentPath=route.path
     return pathMapBreadcrumbs(userMenus,currentPath)
    })
    return{
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
