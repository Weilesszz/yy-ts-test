<template>
  <div class="login-panel">
    <h1 class="title">ERP管理系统</h1>
    <el-tabs v-model="currentTab" stretch type="border-card" class="demo-tabs">
    <el-tab-pane name="account">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><User /></el-icon>
          <span>帐号登陆</span>
        </span>
      </template>
      <login-account ref="accountRef"/>
    </el-tab-pane>
    <el-tab-pane name="phone">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Iphone /></el-icon>
          <span>手机登陆</span>
        </span>
      </template>
      <login-phone ref="phonetRef"/>
    </el-tab-pane>

    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button @click="handleLoginClick" type="primary" class="login-button">立即登陆</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginAccount from './login-account.vue';
import LoginPhone from './login-phone.vue';
export default defineComponent({
  components:{
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword=ref(true)
    // 获取一个组件的类型 typeof
    // 可以通过泛型约束ref的类型
/* 这里传泛型的方法：因为defineComponent导出的是一个对象(组件的描述,用这个描述创建的组件实例)
    类本身是一个拥有构造函数的实例

*/
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phonetRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')
    const handleLoginClick = (isKeepPassword:boolean) => {
      if(currentTab.value==="account") {
        accountRef.value?.loginAction(isKeepPassword)
      }else {
        console.log('手机登陆');
      }
    }
    return{
      isKeepPassword,
      handleLoginClick,
      accountRef,
      currentTab,
      phonetRef
    }
  }
})
</script>
<style lang="less" scoped>
  .login-panel {
    width: 320px;
    margin-bottom: 150px;
    .title {
      text-align: center;
    }

    .account-control{
      display: flex;
      justify-content: space-between;
    }

    .login-button{
      width: 100%;
      margin-top: 10px;
    }
  }
</style>
