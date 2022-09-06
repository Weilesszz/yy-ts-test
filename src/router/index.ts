import localCache from '@/utils/cache';
import { firstMenu } from "@/utils/map-menus";
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
const routes:RouteRecordRaw[]=[
 {
  path:'/',
  redirect:'/main'
 },
 {
  path:'/login',
  name:'login',
  component:()=>import('@/views/login/login.vue')
 },
 {
  path:'/main',
  name:'main',
  component:()=>import('@/views/main/main.vue')
 },
 {
  path:'/:pathMatch(.*)*',
  name:'not-found',
  component:()=>import('@/views/not-found/NotFound.vue')
 }
]

const router = createRouter({
  routes,
  history:createWebHashHistory()
})

router.beforeEach((to)=> {
  if(to.path !=='/login') {
    const token = localCache.getCache('token')
    if(!token) {
      return '/login'
    }
    // const userMenus=(store.state as any).login.userMenus
    // const routes=mapMenusRoutes(userMenus)
    // routes.forEach(route=>{
    //   // console.log(route);
    //   router.addRoute('main',route)
    // })
    if(to.path==='/main') {
      return firstMenu.url
    }
  }
})

export default router
