import { getPageListData } from "@/service/main/system/system";
import { createStore, Store, useStore as userVuexStore } from "vuex";
import login from './login/login';
import dashboard from './main/analysis/dashboard';
import system from './main/system/system';
import { IRootState, IStoreType } from './types';
const store = createStore<IRootState>({
  state() {
    return {
      entireDepartment:[],
      entireRole:[],
      entireMenu:[]
    }
  },
  mutations:{
    changeEntireDepartment(state,departmentList) {
      state.entireDepartment=departmentList
    },
    changeEntireRole(state,roleList) {
      state.entireRole=roleList
    },
    changeEntireMenu(state,menuList) {
      state.entireMenu=menuList
    }
  },
  getters:{

  },
  actions:{
    async getInitialDataAction({commit}) {
      const departmentResult = await getPageListData('/department/list',{
        offset:0,size:10
      })
      const {list:departmentList}=departmentResult.data

      const roleResult = await getPageListData('/role/list',{
        offset:0,size:10
      })
      const {list:roleList}=roleResult.data

      const menuResult = await getPageListData('/menu/list',{})
      const {list:menuList}=menuResult.data
      commit('changeEntireDepartment',departmentList)
      commit('changeEntireRole',roleList)
      commit('changeEntireMenu',menuList)

    }
  },
  modules:{
    login,
    system,
    dashboard
  }
})
export function setupStore(){
  store.dispatch('login/loadLocalLogin')

}

export function useStore():Store<IStoreType> {
  return userVuexStore()
}

export default store
