import { IBreadcrumb } from '@/base-ui/breadcrumb';
import { RouteRecordRaw } from 'vue-router';
// 保留第一个菜单，否则会报错
let firstMenu:any=null

export function mapMenusRoutes(userMenus:any[]):RouteRecordRaw[] {
  const routes:RouteRecordRaw[]=[]
  // 1.先加载默认所有的routes
  const allRoutes:RouteRecordRaw[]=[]
  // 返回一个对象
  const routerFile=require.context('../router/main',true,/\.ts/)
  routerFile.keys().forEach((key)=>{
    // 处理路径 ./
    const route=require(`../router/main`+key.split('.')[1])
    allRoutes.push(route.default)
    // console.log('allRoutes',allRoutes);
  })
  // 2.根据菜单添加需要加的
  const _recurseGetRoute=(menus:any[])=>{
    for (const menu of menus) {
      // console.log('menu',menu);
      if(menu.type===2) {
        const route = allRoutes.find((route)=>route.path===menu.url)
        // BUG:const route = allRoutes.find((route) => {return route.path === menu.url}),之前没有return find需要一个return返回值
        // console.log('route',allRoutes);
        if(route) routes.push(route)
        if(!firstMenu) firstMenu=menu
      }else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  // console.log('routes',routes);
  return routes
}

// 处理面包屑
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// 保留路径
export function pathMapToMenu(userMenus:any[],currentPath:string,breadcrumb?:IBreadcrumb[]):any{
  for (const Menu of userMenus) {
    if(Menu.type===1) {
    const findMenu =  pathMapToMenu(Menu.children ?? [],currentPath)
    if(findMenu) {
      breadcrumb?.push({name:Menu.name,})
      breadcrumb?.push({name:findMenu.name,path:findMenu.url})
      return findMenu
    }
    }else if(Menu.type===2&&Menu.url===currentPath){
      return Menu
    }
  }
}

export function mapMenusToPermissions(userMenus:any[]) {
  const permissions:string[]=[]
  const _recurseGetPeimission = (menus:any[])=>{
    for (const menu of menus ) {
      if(menu.type===1||menu.type===2) {
        _recurseGetPeimission(menu.children ?? [])
      } else if(menu.type===3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPeimission(userMenus)
  return permissions
}

export function getMapMenuLeafKeys(menuList:any[]) {
  const leftKeys:number[]=[]
  const _recurseGetLeaf=(menuList:any[])=>{
    for (const menu of menuList) {
      if(menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leftKeys
}
export { firstMenu };
