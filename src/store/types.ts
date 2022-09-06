import { ILoginState } from './login/types';
import { IDashboardState } from './main/analysis/types';
import { ISystemState } from './main/system/types';
export interface IRootState {
  entireDepartment:any[]
  entireRole:any[]
  entireMenu:any[]
}

export interface IRootStateWithMoudule {
  login:ILoginState,
  system:ISystemState,
  dashboard:IDashboardState
}

export type IStoreType = IRootState & IRootStateWithMoudule
