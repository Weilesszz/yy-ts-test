import { createPageData, deletePageData, editPageData, getPageListData } from '@/service/main/system/system';
import { IRootState } from '@/store/types';
import { Module } from 'vuex';
import { ISystemState } from './types';

const systemModule:Module<ISystemState,IRootState>={
  namespaced:true,
  state() {
    return {
      usersList:[],
      usersCount:0,
      roleList:[],
      roleCount:0,
      goodsList:[],
      goodsCount:0,
      menuList:[],
      menuCount:0
    }
  },
  getters:{
    pageListData(state) {
      return (pageName:string)=>{
        return state[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName:string)=>{
        return state[`${pageName}Count`]
      }
    }
  },
  mutations:{
    changeUsersList(state,userList:any[]) {
      state.usersList=userList
    },
    changeUsersCount(state,userCount:number) {
      state.usersCount=userCount
    },
    changeRoleList(state,list:any[]) {
      state.roleList=list
    },
    changeRoleCount(state,Count:number) {
      state.roleCount=Count
    },
    changeGoodsList(state,list:any[]) {
      state.goodsList=list
    },
    changeGoodsCount(state,Count:number) {
      state.goodsCount=Count
    },
    changeMenuList(state,list:any[]) {
      state.menuList=list
    },
    changeMenuCount(state,Count:number) {
      state.menuCount=Count
    }
  },
  actions:{
    async getPageListAction({commit},payload:any) {
      // 获取pageUrl
      console.log('payload',payload);
      const pageName = payload.pageName
      const pageUrl=`/${pageName}/list`
      const pageResult= await getPageListData(pageUrl,payload.queryInfo)
      console.log('请求结果',pageResult);
      const {list,totalCount} = pageResult.data
      commit(`change${pageName.slice(0, 1).toUpperCase() + pageName.slice(1)}List`,list)
      commit(`change${pageName.slice(0, 1).toUpperCase() + pageName.slice(1)}Count`,totalCount)
    },
    async deletePageDataAction(context,payload:any) {
      // 1.获取pageName和Id
      const {pageName,id}=payload
      const pageUrl=`/${pageName}/${id}`
      // 2.删除
      await deletePageData(pageUrl)
      // 3.刷新页面
      context.dispatch('getPageListAction',{
        pageName,
        queryInfo:{
          offset:0,
          size:10
        }
      })
    },
    async createPageDataAction({dispatch},payload:any) {
      const {pageName,newData}=payload
      const pageUrl=`/${pageName}`
      await createPageData(pageUrl,newData)
      // 刷新页面
      dispatch('getPageListAction',{
        pageName,
        queryInfo:{
          offset:0,
          size:10
        }
      })
    },
    async editPageDataAction({dispatch},payload:any) {
      const {pageName,editData,id}=payload
      const pageUrl=`/${pageName}/${id}`
      await editPageData(pageUrl,editData)
      // 刷新页面
      dispatch('getPageListAction',{
        pageName,
        queryInfo:{
          offset:0,
          size:10
        }
      })
    }
  }
}

export default systemModule
