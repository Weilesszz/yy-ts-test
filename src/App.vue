<template>
  <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
</template>

<script lang="ts">
import { ElConfigProvider } from 'element-plus/lib/index';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  components: {
      ElConfigProvider,
    },
    setup() {
      return {
        locale: zhCn,
      }
    },
})
</script>

<style lang="less">
  .app {
    height: 100%;
  }
</style>
