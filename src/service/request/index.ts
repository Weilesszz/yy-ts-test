import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { LoadingInstance } from "element-plus/lib/components/loading/src/loading";
import { ElLoading } from 'element-plus/lib/index';
import type { YYRequestConfig, YYRequestInterceptors } from "./type";


class YYRequest {
  instance:AxiosInstance
  interceptors?:YYRequestInterceptors
  showLoading:boolean
  loading?:LoadingInstance
  constructor(config:YYRequestConfig) {
    this.instance=axios.create(config)
    this.showLoading=config.showLoading ?? false
    this.interceptors=config.interceptors
    this.instance.interceptors.request.use(this.interceptors?.requestInterceptor,this.interceptors?.requestInterceptorCatch)
    this.instance.interceptors.response.use(this.interceptors?.responseInterceptor,this.interceptors?.responseInterceptorCatch)
    this.instance.interceptors.request.use((config)=>{
      // 所有实例都添加的拦截器
      this.loading=ElLoading.service({
        lock:true,
        text:'加顺载',
        background:'rgba(0,0,0,.2)'
      })
      return config
    },
    (err)=>{
      return err
    })
    this.instance.interceptors.response.use((res)=>{
      this.loading?.close()
      const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
    },
    (err)=>{
      this.loading?.close()
      if (err.response.status === 404) {
        console.log('404的错误~')
      }
      return err
    })
  }
// T泛型：清求的类型
  request<T=any>(config:YYRequestConfig<T>):Promise<T>{
     return new Promise((resolve,reject)=>{
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
    this.instance.request<any,T>(config).then((res)=>{
      if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
            console.log(res)
          }
      this.showLoading=true
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
     })
  }
  get<T=any>(config: YYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T=any>(config: YYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T=any>(config: YYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T=any>(config: YYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default YYRequest
