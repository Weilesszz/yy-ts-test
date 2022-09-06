import router from '@/router';
import { accountLoginRequest, requestUserInfoById, requestUserMenusByRoleId } from '@/service/login/login';
import localCache from '@/utils/cache';
import { mapMenusRoutes, mapMenusToPermissions } from '@/utils/map-menus';
import { Module } from 'vuex';
import { IRootState } from '../types';
import { ILoginState } from './types';
// 泛型 两个S：模块中的state
// R 根中的state
const loginModule:Module<ILoginState,IRootState> = {
  namespaced:true,
  state() {
    return {
      token:'',
      userInfo:{},
      userMenus:[],
      permissions:[]
    }
  },
  mutations:{
    changeToken(state,token:string) {
      state.token=token
    },
    changeUserInfo(state,userInfo:any) {
      state.userInfo=userInfo
    },
    changeUserMenus(state,userMenus:any) {
      state.userMenus=userMenus
       // userMenus => routes
       const routes = mapMenusRoutes(userMenus)

       // 将routes => router.main.children
       routes.forEach((route) => {
         router.addRoute('main', route)
       })

      //  获取用户按钮权限
      const permissions=mapMenusToPermissions(userMenus)
      state.permissions=permissions
    }
  },
  actions:{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async accountLoginAction({commit,dispatch},payload:any) {
      // 1.登陆逻辑，使用await不用.then
      // console.log('执行accountLoginAction',payload);
      const loginResult =await accountLoginRequest(payload)
      const {id,token}=loginResult.data
      commit('changeToken',token)
      localCache.setCache('token',token)
      dispatch('getInitialDataAction',null,{root:true})
      // 2.请求用户信息
      const userInfoResult= await requestUserInfoById(id)
      const userInfo=userInfoResult.data
      commit('changeUserInfo',userInfo)
      localCache.setCache('userInfo',userInfo)
      // 3.跳转首页
      const userMenusResult=await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus=userMenusResult.data
      userMenus.forEach((item:any)=>{
        // console.log('userMenus',item);
        if(item.icon) {
                item.icon=item.icon.replace('el-icon-','')
              }
      })
      commit('changeUserMenus',userMenus)
      localCache.setCache('userMenus',userMenus)
      router.push('/main')
    },
    loadLocalLogin({commit,dispatch}) {
      const token = localCache.getCache('token')
      if(token) {
        commit('changeToken',token)
        dispatch('getInitialDataAction',null,{root:true})
      }
      const userInfo = localCache.getCache('userInfo')
      if(userInfo) {
        commit('changeUserInfo',userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if(userMenus) {
        commit('changeUserMenus',userMenus)
      }
    }
    // phoneLoginAction({commit},payload:any) {
    //   console.log('执行phoneLoginAction',payload);
    // }
  },
  getters:{}
}
export default loginModule
