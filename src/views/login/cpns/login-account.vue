<template>
  <div class="login-account">
    <el-form ref="formRef" label-width="60px" :rules="rules" :model="account">
    <el-form-item label="帐号" prop="name">
      <el-input autocomplete="off" v-model="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input  type="password" v-model="account.password" autocomplete="off" />
    </el-form-item>


  </el-form>
  </div>
</template>
<script lang="ts">
import localCache from '@/utils/cache';
import { ElForm } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { rules } from '../hook/account-config';
export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
  name:localCache.getCache('name') ?? '',
  password:localCache.getCache('password') ?? ''
})
  const formRef=ref<InstanceType<typeof ElForm>>()
  const loginAction=(isKeepPassword :boolean)=>{
    console.log('帐号密码登陆');
    formRef.value?.validate((valid)=>{
      if(valid) {
    console.log('登陆成功');
    // 判断是否需要记住密码
        if(isKeepPassword) {
          localCache.setCache('name',account.name)
          localCache.setCache('password',account.password)
        } else {
          localCache.deleteCache('name')
          localCache.deleteCache('password')
        }
        store.dispatch('login/accountLoginAction',{...account})
      }
    })
  }


    return{
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>
<style lang="less" scoped>

</style>
