/**
 * Created by dujinkai on 2019/5/17.
 */
import request from '@/utils/request';

/**
 * 分页查询品牌信息
 * @param 查询参数
 */
export function querySpecList(query) {
    return request({
        url: 'label/list',
        method: 'get',
        params: query
    })
}

/**
 * 添加品牌
 * @param brand 品牌信息
 */
export function addSpec(brand) {
    return request({
        url: 'label/save',
        method: 'post',
        data: brand
    })
}


/**
 * 删除品牌信息
 * @param ids 品牌id
 */
export function deleteSpec(ids) {

    return request({
        url: 'label/delete',
        method: 'delete',
        params: ids
    })
}

/**
 * 分组/形态信息批量启用或禁用
 * @param ids 品牌id
 */
export function delType(Ids, isUse) {

    return request({
        url: 'label/batchuse',
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
export function updateSpec(brand) {
    return request({
        url: 'label/update',
        method: 'post',
        data: brand
    })
}

