<template>
  <div class="page-search">
    <yyForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h3>条件检索</h3>
      </template>
      <template #footer>
          <div class="handle-btns">
        <el-button type="info" @click="handleResetClick">重置</el-button>
        <el-button type="primary" @click="handleQueryClick">搜索</el-button>
          </div>
      </template>
    </yyForm>

  </div>
</template>

<script lang="ts">
import yyForm from '@/base-ui/Form/';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'user',
  components:{
    yyForm
  },
  props:{
    searchFormConfig:{
      type:Object,
      reuqired:true
    }
  },
  emits:['resetBtnClick','queryBtnClick'],
  setup(props,{emit}) {
    const formItem=props.searchFormConfig?.formItem ?? []
    const formOriginData:any={}
    for (const item of formItem) {
      formOriginData[item.field]=''
    }
    // console.log('',formOriginData);
    const formData=ref(formOriginData)
    // 重置
    const handleResetClick=()=>{
      // for (const key in formOriginData) {
      //     formItem.value[`${key}`]=formOriginData[key]
      // }
      formData.value = formOriginData
      emit('resetBtnClick')
  }

  // 搜索
    const handleQueryClick=()=>{
      console.log('搜索点击');
      emit('queryBtnClick',formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
  .handle-btns{
    padding: 0 20px 20px 0;
  }
</style>
