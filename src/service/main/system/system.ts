import yyRequest from '../../index';
import { IDataType } from '../../types';
export function getPageListData(url:string,queryInfo:any) {
 return yyRequest.post<IDataType>({
    url,
    data:queryInfo
  })
}

export function deletePageData(url:string) {
  return yyRequest.delete<IDataType>({
    url,
  })
}

export function createPageData(url:string,newData:any) {
  return yyRequest.post<IDataType>({
    url,
    data:newData
  })
}

export function editPageData(url:string,editData:any) {
  return yyRequest.patch<IDataType>({
    url,
    data:editData
  })
}
