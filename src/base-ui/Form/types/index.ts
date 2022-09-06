type IForType='input'|'password'|'select'|'datepicker'

export interface IFormItem {
  field:string
  type:IForType
  label:string
  rules?:any[]
  placeholder?:any
  options?:any[]
  otherOptions?:any
  isHidden?:boolean
}

export interface IForm {
  formItem:IFormItem[]
  labelWidth?:string
  colLayout?:any
  itemLayout?:any
}
