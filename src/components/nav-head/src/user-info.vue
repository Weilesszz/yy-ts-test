<template>
  <div class="user-info">
    <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
      <span class="name">{{name}}</span>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="close" @click="handleExitClick">退出登陆</el-dropdown-item>
        <el-dropdown-item  icon="user" divided>用户信息</el-dropdown-item>
        <el-dropdown-item  icon="setting">系统管理</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  </div>
</template>

<script lang="ts">

import localCache from '@/utils/cache';
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const name = computed(()=>store.state.login.userInfo.name)
    const handleExitClick=()=>{
      localCache.deleteCache('token')
      router.push('/main')
    }
    return {
      name,
      handleExitClick
    }
  }

})
</script>

<style lang="less" scoped>
  .el-dropdown-link {
  display: flex;
  cursor: pointer;
  align-items: center;

  .name {
    margin-left: 10px;
  }
}
</style>
