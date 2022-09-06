export interface IAccount {
  name:string
  password:string
}

export interface ILoginResult {
  id:number
  name:string
  token:string
}

// 返回信息 不能写死所以用泛型


