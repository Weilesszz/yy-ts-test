<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #image="scope">
            <el-image style="width:100px;height: 100px;" :src="scope.row.imgUrl" :preview-src-list="[scope.row.imgUrl]" :z-index="10" preview-teleported>
            </el-image>
      </template>
      <template #oldPrice="scope">
            {{'￥'+scope.row.oldPrice}}
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import pageContent from '@/components/page-content/';
import { defineComponent } from 'vue';
import { contentTableConfig } from './config/content.config';
export default defineComponent({
  name: 'goods',
  components:{
    pageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
