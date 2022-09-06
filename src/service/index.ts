// 统一出口
import localCache from '@/utils/cache';
import YYRequest from './request';
import { BASE_URL, TIME_OUT } from './request/config';

const yyRequest=new YYRequest({
  baseURL:BASE_URL,
  timeout:TIME_OUT,
  showLoading:true,
  interceptors:{
    requestInterceptor:(config)=>{
      const token=localCache.getCache('token')
      if(token&&config.headers) {
        config.headers.Authorization=`Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch:(err)=>{
      return err
    },
    responseInterceptor:(res)=>{
      return res
    },
    responseInterceptorCatch:(err)=>{
      return err
    },
  }
})
export default yyRequest
