/**
 * Created by dujinkai on 2019/5/17.
 */
import request from '@/utils/request';

/**
 * 分页查询品牌信息
 * @param 查询参数
 */
export function brandlist(query) {
  return request({
    url: 'group/list',
    method: 'get',
    params: query
  })
}

/**
 * 添加品牌
 * @param brand 品牌信息
 */
export function addBrand(brand) {
  return request({
    url: 'group/save',
    method: 'post',
    data: brand
  })
}


/**
 * 删除品牌信息
 * @param ids 品牌id
 */
export function delBrand(ids) {
  console.log("delBrand -> ids", ids)
  return request({
    url: 'group/delete',
    method: 'delete',
    params: ids
  })
}

/**
 * 分组/形态信息批量启用或禁用
 * @param ids 品牌id
 */
export function delType(Ids, isUse) {
  console.log("delType -> ids", Ids)
  return request({
    url: 'group/batchisuse',
    method: 'put',
    params: { groupIds: Ids, isUse }
  })
}



/**
 *  根据品牌id查询品牌信息
 */
// export function queryById(id) {
//   return request({
//     url: 'brand/' + id,
//     method: 'get',
//   })
// }


/**
 * 更新品牌
 * @param brand 品牌信息
 */
export function updateBrand(brand) {
  return request({
    url: 'group/update',
    method: 'post',
    data: brand
  })
}

