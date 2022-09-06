<!-- @ts-nocheck -->
<template>
  <div class="table-header">
    <div class="header">
      <slot name="header">
        <div class="title"> {{title}} </div>
        <div class="handle">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
  </div>
  <!-- row-key="" tree-props="{children:'children'}" -->
  <el-table :data="listData" border @selection-change="handleSelectionChange" style="width: 100%" v-bind="childrenProps">
    <el-table-column v-if="showIndexColumn" type="selection" align="center" width="60">
        </el-table-column>
        <el-table-column v-if="showIndexColumn" type="index" label="序号" align="center" width="80">
        </el-table-column>
       <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
  </el-table>
  <div class="footer" v-if="showFooter">
    <slot name="footer">
        <el-pagination
      :page-sizes="[10, 20, 30]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listCount"
      :page-size="page.pageSize"
      :current-page="page.currentPage"
      @update:page-size="handleSizeChange"
      @update:current-page="handleCurrentChange"
    />
    </slot>
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name:'yyTable',
  props:{
    title:{
      type:String,
      default:''
    },
    listData:{
      type:Array,
      requited:true
    },
    listCount:{
      type:Number,
      requited:true
    },
    propList:{
      type:Array as PropType<any[]>,
      requited:true
    },
    showIndexColumn:{
      type:Boolean,
      default:false
    },
    showSelectColumn:{
      type:Boolean,
      default:false
    },
    page:{
      type:Object,
      default:()=>({
        currentPage:0,
        pageSize:10
      })
    },
    childrenProps:{
      type:Object,
      default:()=>({})
    },
    showFooter:{
      type:Boolean,
      default:true
    }
  },
  emits:['SelectionChange','update:page','update:page'],
  setup(props,{emit}) {
    const handleSelectionChange=(value:any)=>{
      emit('SelectionChange',value)
    }
    const handleSizeChange=(pageSize:number)=>{
      console.log('大小变化',pageSize);
      emit('update:page',{...props.page,pageSize})
    }
    const handleCurrentChange=(currentPage:number)=>{
      console.log('页数变化',currentPage);
      emit('update:page',{...props.page,currentPage})
    }
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }

})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
