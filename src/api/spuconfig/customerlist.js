/**
 * Created by dujinkai on 2019//18.
 */
import request from '@/utils/request';

/**
 * 获取分组/形态信息数据列表
 * @param 查询参数
 */
export function groupList(query) {
  return request({
    url: 'group/list',
    method: 'get',
    params: query
  })
}
/**
 * 根据用户ID获取用户详情
 * @param 查询参数
 */
export function customerDetail(query) {
  return request({
    url: 'customerDetail',
    method: 'get',
    params: query
  })
}

/**
 *根据用户ID获取用户发票抬头信息
 * @param 查询参数
 */
export function customerInvoiceList(query) {
  return request({
    url: 'customerInvoiceList',
    method: 'get',
    params: query
  })
}

/**
 * 
根据用户ID获取用户出行人信息
 * @param 查询参数
 */
export function customerTravelerList(query) {
  return request({
    url: 'customerTravelerList',
    method: 'get',
    params: query
  })
}





