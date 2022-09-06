import PageModal from '@/components/page-modal';
import { ref } from 'vue';
type CallbackFn=(arg?:any)=>void
export function usePageModal (newCb?:CallbackFn,editCb?:CallbackFn) {
  const pageModalRef=ref<InstanceType<typeof PageModal>>(null)
    const defaultInfo=ref({})
    const handleNewData = ():void => {
      defaultInfo.value={}
      if(pageModalRef.value) {
        pageModalRef.value.dialogVisible=true
      }
      newCb && newCb()
    }
    const handleEditData = (item:any):void=> {
      defaultInfo.value={...item}
      // console.log('defaultInfo',defaultInfo.value);
      if(pageModalRef.value) {
        pageModalRef.value.dialogVisible=true
      }
      editCb&&editCb(item)
    }
    return [pageModalRef,defaultInfo,handleNewData,handleEditData]
}
