import PageContent from "@/components/page-content"
import { ref } from "vue"

export function usePageSearch():any {

    const pageContentRef=ref<InstanceType<typeof PageContent>>(null)
    const handleResetClick=()=>{
      pageContentRef.value?.getPageData()
    }
    const handleQueryClick=(queryInfo:any)=>{
      pageContentRef.value?.getPageData(queryInfo)
    }
    return [pageContentRef,handleResetClick,handleQueryClick]
}
