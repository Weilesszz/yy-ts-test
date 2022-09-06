<template>
<div class="page-modal">
      <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center destroy-on-close>
        <yy-form v-bind="modalConfig" v-model="formData"></yy-form>
        <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确认</el-button>
      </span>
    </template>
  </el-dialog>
    </div>
</template>

<script lang="ts">

import yyForm from '@/base-ui/Form';
import { useStore } from '@/store';
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  name:'pageModal',
  props:{
    modalConfig:{
      type:Object,
      required:true
    },
    defaultInfo:{
      type:Object,
      default:()=>({})
    },
    pageName:{
      type:String,
      required:true
    },
    otherInfo:{
      type:Object,
      default:()=>({})
    }
  },
  components:{
    yyForm
  },
  setup(props){
    const dialogVisible=ref(false)
    const formData=ref<any>({})
    const store=useStore()
    watch(()=>props.defaultInfo,(newValue)=>{
      for (const item of props.modalConfig.formItem) {
        formData.value[`${item.field}`]=newValue[`${item.field}`]
      }
    })

    // 确定按钮的逻辑
    const handleConfirmClick=()=>{
      dialogVisible.value=false
      if(Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/editPageDataAction',{
          pageName:props.pageName,
          editData:{...formData.value,...props.otherInfo},
          id:props.defaultInfo.id
        })
      }else{
        // 新建
        store.dispatch('system/createPageDataAction',{
          pageName:props.pageName,
          newData:{...formData.value,...props.otherInfo},
        })
        console.log('信息',{...formData.value,...props.otherInfo});
      }
    }
    return {
      dialogVisible,
      formData,
      handleConfirmClick
      }
    }
  },
)
</script>

<style>

</style>
