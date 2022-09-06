import yyRequest from '../index';
import { IDataType } from '../types';
import { IAccount, ILoginResult } from './type';

enum LoginAPI {
  AccountLogin='/login',
  LoginuserInfo='/users/',
  UserMenus = '/role/' //role/ + id +menu
}

export function accountLoginRequest(account:IAccount) {
  return yyRequest.post<IDataType<ILoginResult>>({
    url:LoginAPI.AccountLogin,
    data:account
  })
}

export function requestUserInfoById(id:number) {
  return yyRequest.get<IDataType>({
    url:LoginAPI.LoginuserInfo+id,
    showLoading:false
  })
}

export function requestUserMenusByRoleId(id:number) {
  return yyRequest.get<IDataType>({
    url:LoginAPI.UserMenus+id+'/menu',
    showLoading:false
  })
}
