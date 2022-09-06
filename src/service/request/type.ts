import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface YYRequestInterceptors<T=AxiosResponse> {
  requestInterceptor?:(config:AxiosRequestConfig)=>AxiosRequestConfig
  requestInterceptorCatch?:(error:any)=>any
  responseInterceptor?:(res: T) => T
  responseInterceptorCatch?:(error:any)=>any
}
export interface YYRequestConfig<T=AxiosResponse> extends AxiosRequestConfig {
  showLoading?: boolean;
  interceptors?:YYRequestInterceptors<T>
}
