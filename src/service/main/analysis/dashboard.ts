import yyRequest from '../../index';
enum DashboardAPI {
  categoryGoodsCount='/goods/category/count',
  categoryGoodsSale='/goods/category/sale',
  categoryGoodsFavor='/goods/category/favor',
  addressGoodsSale='/goods/address/sale'
}
export function getCategoryGoodsCount() {
  return yyRequest.get({
    url:DashboardAPI.categoryGoodsCount
  })
}
export function getCategoryGoodsSale() {
  return yyRequest.get({
    url:DashboardAPI.categoryGoodsSale
  })
}
export function getCategoryGoodsFavor() {
  return yyRequest.get({
    url:DashboardAPI.categoryGoodsFavor
  })
}
export function getAddressGoodsSale() {
  return yyRequest.get({
    url:DashboardAPI.addressGoodsSale
  })
}
