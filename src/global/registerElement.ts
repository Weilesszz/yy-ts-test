import {
  ElAlert, ElAside, ElAvatar, ElBreadcrumb, ElBreadcrumbItem, ElButton, ElCard, ElCheckbox, ElCol, ElContainer, ElDatePicker, ElDialog, ElDropdown, ElDropdownItem, ElDropdownMenu, ElForm, ElFormItem, ElHeader, ElIcon, ElImage, ElInput, ElLink, ElMain, ElMenu, ElMenuItem, ElMenuItemGroup, ElOption, ElPagination, ElRow, ElSelect, ElSubMenu, ElTable, ElTableColumn, ElTabPane, ElTabs, ElTree
} from 'element-plus/lib/index';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import type { App } from 'vue';


const components=[
  ElAlert,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElMain,
  ElAside,
  ElHeader,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard
]


export default function (app:App):void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  for (const component of components) {
    app.component(component.name,component)
  }
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
